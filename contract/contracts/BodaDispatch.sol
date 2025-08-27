// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";

contract DecentralizedBodaDispatch is AutomationCompatibleInterface, Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable {
    IERC20 public stableToken;
    // ===> Trip Struct
    struct Trip {
        uint256 fare; // slot 0
        address rider; // slot 2 (20 bytes)
        address client; // slot 3 (20 bytes)
        uint64 distance; // slot 1 (distance in km)
        uint64 startTime; // slot 4 (8 bytes)
        uint64 endTime; // slot 4 (8 bytes)
        uint64 duration; // slot 4 (8 bytes)
        uint32 tripId; // slot 4 (4 bytes)
        bool isCompleted; // slot 4 (1 byte)
        bool isPaidOut; // slot 4 (1 byte)
        // padding fills the rest of slot 4 to make 32 bytes
    }
    mapping(uint256 => Trip) public trips;
    uint256 public nextTripId;
    // ===> Rider Struct
    struct Rider {
        uint256 earnings;
        address user;
        uint32 riderId;
        uint32 stars;
        uint32 totalTrips;
        bool isRegistered;
    }

    mapping(address => Rider) public riderProfiles;
    uint256 public nextRiderId;
    address[] public allRiders;

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
    event TripRequested(uint256 tripId, address client, uint256 _distance);

    // initializer
    function initialize(address _tokenUsed) public initializer{
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
            stars: 0,
            totalTrips: 0,
            isRegistered: true
        });
        allRiders.push(msg.sender);
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
    function clientDeposit(uint256 _amount) external payable onlyClient {
        require(_amount > 0, "Must send some ETH");
        stableToken.transferFrom(msg.sender, address(this), _amount);
        clientProfiles[msg.sender].balance += _amount;
        clientProfiles[msg.sender].hasSomeBalance = true;

        emit ClientDeposited(msg.sender, msg.value);
    }

    // ===> Start Trip (non-payable)
    function initiateTrip(uint64 _distance) external onlyClient {
        require(clientProfiles[msg.sender].balance > 0, "Insufficient balance");
        uint256 tripId = nextTripId ++;

        trips[tripId] = Trip({
            fare: 0,
            rider: address(0),
            client: msg.sender,
            distance: _distance,
            startTime: uint64(block.timestamp),
            endTime: 0,
            duration: 0,
            tripId: uint32(tripId),
            isCompleted: false,
            isPaidOut: false
        });

        emit TripRequested(tripId, msg.sender, _distance);
    }

    // ======> rider's reaction to the trip
    function acceptTripRequest(
        uint256 _tripId,
        uint256 _fare
    ) external onlyRider {
       Trip storage newTrip = trips[_tripId];
       require(newTrip.client != address(0), "Invalid Trip");
       require(newTrip.rider == address(0), "Trip already accepted");
       require(!newTrip.isCompleted, "Trip completed");
       require(_fare > 0, "Invalid fare");
       newTrip.fare = _fare;
       newTrip.rider = msg.sender;
    }

    // ===> Complete Trip
    function completeTrip(uint256 _tripId) external onlyClient {
        Trip storage trip = trips[_tripId];
        require(msg.sender == trip.client, "Only client can complete trip");
        require(!trip.isCompleted, "Trip already completed");

        trip.isCompleted = true;
        trip.endTime = uint64(block.timestamp);
        trip.duration = trip.endTime - trip.startTime;
    }

    // ===> Reward Rider (can be called manually or by Automation)
    function rewardTripRiderByFare(uint256 _tripId) public {
        Trip storage trip = trips[_tripId];
        require(trip.isCompleted, "Trip not complete");
        require(!trip.isPaidOut, "Already paid");
        require(trip.client != address(0), "Invalid trip");
    require(trip.rider != address(0), "No rider");

        Client storage client = clientProfiles[trip.client];
        Rider storage rider = riderProfiles[trip.rider];

        require(client.balance >= trip.fare, "Insufficient client balance");

        client.balance -= trip.fare;
        rider.earnings += trip.fare;
        rider.stars += 1;
        rider.totalTrips += 1;

        trip.isPaidOut = true;

        emit TripCompleted(_tripId, trip.rider, rider.stars);
    }

    // ===> Withdraw Rider Earnings
    function riderWithdrawEarnings(uint256 _amount) external onlyRider nonReentrant {
        Rider storage rider = riderProfiles[msg.sender];
        require(_amount > 0 && rider.earnings >= _amount, "Invalid amount");
        rider.earnings -= _amount;
        stableToken.transfer(msg.sender, _amount);

        emit RiderWithdraw(msg.sender, _amount);
    }

    // ===> Withdraw Client Balance
    function clientWithdraw(uint256 _amount) external onlyClient nonReentrant {
        Client storage client = clientProfiles[msg.sender];
        require(_amount > 0 && client.balance >= _amount, "Invalid amount");

        client.balance -= _amount;
        stableToken.transfer(msg.sender, _amount);

        emit ClientWithdraw(msg.sender, _amount);
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
        for (uint256 i = 0; i < nextTripId; i++) {
            Trip memory trip = trips[i];
            if (trip.isCompleted && !trip.isPaidOut) {
                return (true, abi.encode(i));
            }
        }
        return (false, "");
    }

    function performUpkeep(bytes calldata performData) external override {
        uint256 tripId = abi.decode(performData, (uint256));
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

    function getAllRiders() external view returns (address[] memory) {
        return allRiders;
    }

    // ===> Accept fallback ETH
    receive() external payable {}
}
