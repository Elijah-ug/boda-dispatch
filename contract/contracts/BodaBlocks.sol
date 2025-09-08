// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

contract BodaBlocks is
    AutomationCompatibleInterface,
    Initializable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable
{
    IERC20 public stableToken;
    using SafeERC20 for IERC20;
    // ===> Trip Struct
    struct Trip {
        uint256 fare; // slot 0
        uint256 charges;
        address rider; // slot 2 (20 bytes)
        address client; // slot 3 (20 bytes)
        uint64 distance; // slot 1 (distance in km)
        uint32 tripId; // slot 4 (4 bytes)
        bool tripStarted; // slot 4 (1 byte)
        bool isCompleted; // slot 4 (1 byte)
        bool isPaidOut; // slot 4 (1 byte)
        string pickup; // slot 6 (pointer)
        string destination; // slot 7 (pointer)
        // padding fills the rest of slot 4 to make 32 bytes
    }
    mapping(uint256 => Trip) public trips;
    uint256 public nextTripId;
    // ===> Rider Struct
    struct Rider {
        uint256 earnings;
        address user;
        uint32 riderId;
        uint32 completedTrips;
        uint32 totalTrips;
        bool isRegistered;
    }

    mapping(address => Rider) public riderProfiles;
    uint256 public nextRiderId;
    // address[] public allRiders;

    // ===> Client Struct
    struct Client {
        uint256 balance;
        address user;
        uint32 clientId;
        bool isRegistered;
        bool hasSomeBalance;
    }

    mapping(address => Client) public clientProfiles;
    uint256 public nextClientId;

    // ===> Events
    event RiderRegistered(address rider, uint256 riderId);
    event ClientRegistered(address client, uint256 clientId);
    event TripStarted(
        uint256 tripId,
        address client,
        address rider,
        uint256 fare
    );
    event TripCompleted(uint256 tripId, address rider, uint256 updatedStars);
    event RiderWithdraw(address rider, uint256 amount);
    event ClientWithdraw(address client, uint256 amount);
    event ClientDeposited(address client, uint256 amount);
    event TripRequested(
        uint256 tripId,
        address client,
        uint256 _distance,
        uint256 fare
    );
    // queue events
    event TripQueued(uint256 tripId);
    // ===> Unpaid completed-trip queue (to avoid scanning all trips)
    // We store tripIds in an array and maintain a read index; processed entries are set to 0.
    uint256[] private unpaidTripQueue;
    uint256 private unpaidQueueIndex;
    uint256 public platformFee;
    uint32 public percentageFee;

    // initializer
    function initialize(address _tokenUsed) public initializer {
        require(_tokenUsed != address(0));
        __Ownable_init(msg.sender);
        __ReentrancyGuard_init();
        stableToken = IERC20(_tokenUsed);
    }

    modifier onlyClient() {
        require(clientProfiles[msg.sender].isRegistered, "Not a client");
        _;
    }

    modifier onlyRider() {
        require(riderProfiles[msg.sender].isRegistered, "Not a rider");
        _;
    }
    // platform fee update
    function updatePlatformPercentageFee(
        uint32 _percentage
    ) external onlyOwner {
        require(_percentage <= 1000, "Much fee");
        percentageFee = _percentage;
    }
    // ===> Rider Registration
    function registerRider() external {
        require(
            !riderProfiles[msg.sender].isRegistered,
            "Already registered as rider"
        );
        uint256 newId = nextRiderId++;
        riderProfiles[msg.sender] = Rider({
            earnings: 0,
            user: msg.sender,
            riderId: uint32(newId),
            completedTrips: 0,
            totalTrips: 0,
            isRegistered: true
        });
        // allRiders.push(msg.sender);
        emit RiderRegistered(msg.sender, newId);
    }

    // ===> Client Registration
    function registerClient() external {
        require(
            !clientProfiles[msg.sender].isRegistered,
            "Already registered as client"
        );
        uint256 newId = nextClientId++;
        clientProfiles[msg.sender] = Client({
            balance: 0,
            user: msg.sender,
            clientId: uint32(newId),
            isRegistered: true,
            hasSomeBalance: false
        });

        emit ClientRegistered(msg.sender, newId);
    }

    // ===> Deposit Funds
    function clientDeposit(uint256 _amount) external onlyClient {
        require(_amount > 0, "Invalid amount");
        stableToken.safeTransferFrom(msg.sender, address(this), _amount);
        clientProfiles[msg.sender].balance += _amount;
        clientProfiles[msg.sender].hasSomeBalance = true;

        emit ClientDeposited(msg.sender, _amount);
    }

    // ===> initiate Trip (non-payable)
    function initiateTrip(
        string memory _pickup,
        string memory _destination,
        uint64 _distance,
        uint256 _fare
    ) external onlyClient {
        Client storage client = clientProfiles[msg.sender];
        require(client.balance > 0, "Insufficient balance");
        require(clientProfiles[msg.sender].balance >= _fare, "Low fare");
        uint256 tripId = nextTripId++;
        client.balance -= _fare;
        uint256 charge = (_fare * percentageFee) / 1000;
        trips[tripId] = Trip({
            fare: _fare,
            charges: charge,
            rider: address(0),
            client: msg.sender,
            distance: _distance,
            tripId: uint32(tripId),
            tripStarted: false,
            isCompleted: false,
            isPaidOut: false,
            pickup: _pickup,
            destination: _destination
        });
        emit TripRequested(tripId, msg.sender, _distance, _fare);
    }

    // ======> rider's reaction to the trip
    function acceptTripRequest(
        uint256 _tripId
    ) external onlyRider nonReentrant {
        Trip storage newTrip = trips[_tripId];
        require(newTrip.client != address(0), "Invalid Trip");
        require(newTrip.rider == address(0), "Trip already accepted");
        require(!newTrip.isCompleted, "Trip completed");
        require(!newTrip.tripStarted, "Trip started");
        // Client storage client = clientProfiles[newTrip.client];
        require(newTrip.fare > 0, "No locked fare");
        newTrip.rider = msg.sender;
    }
    // trigger start trip
    function tripStarted(uint32 _tripId) external onlyClient nonReentrant {
        Trip storage newTrip = trips[_tripId];
        require(newTrip.client != address(0), "Invalid Trip");
        require(msg.sender == newTrip.client, "Not recognized");
        require(newTrip.rider != address(0), "Trip already accepted");
        require(!newTrip.tripStarted, "Trip Started");
        require(newTrip.fare > 0, "No locked fare");
        newTrip.tripStarted = true;
        emit TripStarted(_tripId, newTrip.client, newTrip.rider, newTrip.fare);
    }
    // ===> Complete Trip
    function completeTrip(uint256 _tripId) external onlyClient {
        Trip storage trip = trips[_tripId];
        require(msg.sender == trip.client, "Only client can complete trip");
        require(!trip.isCompleted, "Trip already completed");
        require(trip.tripStarted, "Trip wasn't started");

        trip.isCompleted = true;
        trip.tripStarted = false;
        // enqueue unpaid completed trip for Automation to process
        if (!trip.isPaidOut) {
            unpaidTripQueue.push(_tripId);
            emit TripQueued(_tripId);
        }
    }

    // ===> Reward Rider (can be called manually or by Automation)
    function rewardTripRiderByFare(uint256 _tripId) public nonReentrant {
        Trip storage trip = trips[_tripId];
        require(trip.isCompleted, "Trip not complete");
        require(!trip.isPaidOut, "Already paid");
        require(trip.client != address(0), "Invalid trip");
        require(trip.rider != address(0), "No rider");
        Rider storage rider = riderProfiles[trip.rider];
        uint256 netPayment = trip.fare - trip.charges;
        rider.earnings += netPayment;
        platformFee += trip.charges;
        rider.completedTrips += 1;
        rider.totalTrips += 1;

        trip.isPaidOut = true;

        emit TripCompleted(_tripId, trip.rider, rider.completedTrips);
    }

    // ===> Withdraw Rider Earnings
    function riderWithdrawEarnings(
        uint256 _amount
    ) external onlyRider nonReentrant {
        Rider storage rider = riderProfiles[msg.sender];
        require(_amount > 0 && rider.earnings >= _amount, "Invalid amount");
        rider.earnings -= _amount;
        stableToken.safeTransfer(msg.sender, _amount);

        emit RiderWithdraw(msg.sender, _amount);
    }

    // ===> Withdraw Client Balance
    function clientWithdraw(uint256 _amount) external onlyClient nonReentrant {
        Client storage client = clientProfiles[msg.sender];
        require(_amount > 0 && client.balance >= _amount, "Invalid amount");
        uint256 fee = (_amount * percentageFee) / 1000;
        client.balance -= _amount;
        platformFee += fee;
        uint256 netWithdraw = _amount -= fee;
        stableToken.safeTransfer(msg.sender, netWithdraw);

        emit ClientWithdraw(msg.sender, _amount);
    }

    function withdrawFees(uint256 _amount) external onlyOwner nonReentrant {
        require(platformFee >= _amount, "Invalid amount");
        stableToken.safeTransfer(msg.sender, _amount);
    }
    // ===> Chainlink Automation

    function checkUpkeep(
        bytes calldata
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        for (uint256 i = unpaidQueueIndex; i < unpaidTripQueue.length; i++) {
            uint256 id = unpaidTripQueue[i];
            if (id == 0) {
                continue;
            }

            Trip memory trip = trips[id];

            if (trip.isCompleted && !trip.isPaidOut) {
                return (true, abi.encode(id));
            }
        }
        return (false, "");
    }
    // performUpkeep will clear the queue entry (set to 0) and advance unpaidQueueIndex when possible,
    // then call rewardTripRiderByFare to process payment.
    function performUpkeep(bytes calldata performData) external override {
        uint256 tripId = abi.decode(performData, (uint256));
        // find and clear the queued entry (we don't shift the array; we set slot to 0)
        for (uint256 i = unpaidQueueIndex; i < unpaidTripQueue.length; i++) {
            if (unpaidTripQueue[i] == tripId) {
                unpaidTripQueue[i] = 0;
                // advance unpaidQueueIndex while front slots are zero
                while (
                    unpaidQueueIndex < unpaidTripQueue.length &&
                    unpaidTripQueue[unpaidQueueIndex] == 0
                ) {
                    unpaidQueueIndex++;
                }
            }
        }
        // perform the actual reward (To revert if client balance is insufficient)

        rewardTripRiderByFare(tripId);
    }

    // ===> View Functions
    function getRiderInfo(address _rider) external view returns (Rider memory) {
        return riderProfiles[_rider];
    }

    function getClientInfo(
        address _client
    ) external view returns (Client memory) {
        return clientProfiles[_client];
    }

    function getTripDetails(
        uint256 _tripId
    ) external view returns (Trip memory) {
        return trips[_tripId];
    }
    function getStableToken() external view returns (address) {
        return address(stableToken);
    }

    function returnPlatformFees() external view onlyOwner returns (uint256) {
        return platformFee;
    }

    // ===> Accept fallback ETH
    // receive() external payable {}
}
