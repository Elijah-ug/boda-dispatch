// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";

contract DecentralizedBodaDispatch is AutomationCompatibleInterface {
    // ===> Trip Struct
    struct Trip {
        uint256 tripId;
        address rider;
        address client;
        uint256 fare;
        bool isCompleted;
        bool isPaidOut;
    }

    mapping(uint256 => Trip) public trips;
    uint256 public nextTripId;

    // ===> Rider Struct
    struct Rider {
        uint256 riderId;
        address user;
        uint256 earnings;
        uint256 stars;
        uint256 totalTrips;
        bool isRegistered;
    }

    mapping(address => Rider) public riderProfiles;
    uint256 public nextRiderId;
    address[] public allRiders;

    // ===> Client Struct
    struct Client {
        uint256 clientId;
        address user;
        uint256 balance;
        bool isRegistered;
        bool hasSomeBalance;
    }

    mapping(address => Client) public clientProfiles;
    uint256 public nextClientId;

    // ===> Events
    event RiderRegistered(address rider, uint256 riderId);
    event ClientRegistered(address client, uint256 clientId);
    event TripStarted(uint256 tripId, address client, address rider, uint256 fare);
    event TripCompleted(uint256 tripId, address rider, uint256 updatedStars);
    event RiderWithdraw(address rider, uint256 amount);
    event ClientWithdraw(address client, uint256 amount);
    event ClientDeposited(address client, uint256 amount);

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
        require(!riderProfiles[msg.sender].isRegistered, "Already registered as rider");

        riderProfiles[msg.sender] = Rider({
            riderId: nextRiderId,
            user: msg.sender,
            earnings: 0,
            stars: 0,
            totalTrips: 0,
            isRegistered: true
        });
        allRiders.push(msg.sender);
        emit RiderRegistered(msg.sender, nextRiderId);
        nextRiderId++;
    }

    // ===> Client Registration
    function registerClient() external {
        require(!clientProfiles[msg.sender].isRegistered, "Already registered as client");

        clientProfiles[msg.sender] = Client({
            clientId: nextClientId,
            user: msg.sender,
            balance: 0,
            isRegistered: true,
            hasSomeBalance: false
        });

        emit ClientRegistered(msg.sender, nextClientId);
        nextClientId++;
    }

    // ===> Deposit Funds
    function clientDeposit() external payable onlyClient {
        require(msg.value > 0, "Must send some ETH");

        clientProfiles[msg.sender].balance += msg.value;
        clientProfiles[msg.sender].hasSomeBalance = true;

        emit ClientDeposited(msg.sender, msg.value);
    }

    // ===> Start Trip (non-payable)
    function startTrip(address _rider, uint256 _fare) external onlyClient {
        require(riderProfiles[_rider].isRegistered, "Invalid rider");
        require(clientProfiles[msg.sender].balance >= _fare, "Insufficient balance");
        require(_fare > 0, "Fare must be > 0");

        uint256 tripId = nextTripId;

        trips[tripId] = Trip({
            tripId: tripId,
            rider: _rider,
            client: msg.sender,
            fare: _fare,
            isCompleted: false,
            isPaidOut: false
        });

        emit TripStarted(tripId, msg.sender, _rider, _fare);
        nextTripId++;
    }

    // ===> Complete Trip
    function completeTrip(uint256 _tripId) external onlyClient {
        Trip storage trip = trips[_tripId];
        require(msg.sender == trip.client, "Only client can complete trip");
        require(!trip.isCompleted, "Trip already completed");

        trip.isCompleted = true;
    }

    // ===> Reward Rider (can be called manually or by Automation)
    function rewardTripRiderByFare(uint256 _tripId) public {
        Trip storage trip = trips[_tripId];
        require(trip.isCompleted, "Trip not complete");
        require(!trip.isPaidOut, "Already paid");

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
    function riderWithdrawEarnings(uint256 _amount) external onlyRider {
        Rider storage rider = riderProfiles[msg.sender];
        require(_amount > 0, "Invalid amount");
        require(rider.earnings >= _amount, "Insufficient earnings");

        rider.earnings -= _amount;
        payable(msg.sender).transfer(_amount);

        emit RiderWithdraw(msg.sender, _amount);
    }

    // ===> Withdraw Client Balance
    function clientWithdraw(uint256 _amount) external onlyClient {
        Client storage client = clientProfiles[msg.sender];
        require(_amount > 0, "Invalid amount");
        require(client.balance >= _amount, "Not enough balance");

        client.balance -= _amount;
        payable(msg.sender).transfer(_amount);

        emit ClientWithdraw(msg.sender, _amount);
    }

    // ===> Chainlink Automation

    function checkUpkeep(bytes calldata) external view override returns (bool upkeepNeeded, bytes memory performData) {
        for (uint256 i = 0; i < nextTripId; i++) {
            Trip memory trip = trips[i];
            if (trip.isCompleted && !trip.isPaidOut) {
                return (true, abi.encode(i));
            }
        }
        return (false, bytes(""));
    }

    function performUpkeep(bytes calldata performData) external override {
        uint256 tripId = abi.decode(performData, (uint256));
        rewardTripRiderByFare(tripId);
    }

    // ===> View Functions
    function getRiderInfo(address _rider) external view returns (Rider memory) {
        return riderProfiles[_rider];
    }

    function getClientInfo(address _client) external view returns (Client memory) {
        return clientProfiles[_client];
    }

    function getTripDetails(uint256 _tripId) external view returns (Trip memory) {
        return trips[_tripId];
    }

    function getAllRiders() external view returns (address[] memory) {
    return allRiders;
}

    // ===> Accept fallback ETH
    receive() external payable {}
}
