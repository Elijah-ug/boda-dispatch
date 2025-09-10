import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRiderProfileThunk } from "../features/riders/profiles/riderProfileThunk";
import { autoConnectWallet } from "../features/wallet/connectWallet";
import { fetchTripThunk } from "../features/clients/trip/tripData/tripThunk";
import { fetchCurrentTripId } from "../features/clients/trip/tripData/currentTripIdThunk";

const RiderDashboard = ({ riderData, assignedTrips, onWithdraw }) => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const dispatch = useDispatch();
  const { riderProfile } = useSelector((state) => state.rider);
  const { tripInfo } = useSelector((state) => state.trips);
  const { address } = useSelector((state) => state.auth);
  console.log("riderProfile.isRegistered: ", riderProfile.isRegistered);

  useEffect(() => {
    dispatch(autoConnectWallet());
    dispatch(fetchRiderProfileThunk({ address }));
  }, [address]);
  useEffect(() => {
    dispatch(fetchCurrentTripId())
      .unwrap()
      .then((tripId) => {
        dispatch(fetchTripThunk({ tripId }));
      });
  }, []);
  const showTripInfo = riderProfile?.user?.toLowerCase() === tripInfo?.rider?.toLowerCase();
  console.log("Number(tripInfo.tripId) : " + typeof Number(tripInfo.tripId));
  console.log("tripInfo.rider: ", tripInfo.rider);

  return (
    <div className="bg-gray-700 min-h-screen text-white">
      <div className="p-6 mx-auto space-y-6 max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-6">Rider Dashboard</h1>

        {/* Rider Info Card */}
        <div className="p-4 rounded-xl shadow flex items-center justify-around gap-6 text-amber-400 bg-gray-800">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-white">🏍️ Rider Info</h2>
            <p>
              <strong>Address:</strong>
              <span className="ml-2">
                {riderProfile?.user?.slice(0, 7)}...{riderProfile?.user?.slice(-5)}
              </span>
            </p>
            <p>
              <strong>Rider ID:</strong>
              <span className="ml-2">{riderProfile?.isRegistered ? Number(riderProfile?.riderId + 1) : "N/A"}</span>
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-white">⭐ Stats</h2>
            <p>
              <strong>Stars:</strong>
              <span className="ml-2">{riderProfile?.stars}</span>
            </p>
            <p>
              <strong>Total Trips:</strong>
              <span className="ml-2">{riderProfile?.totalTrips}</span>
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-white">💰 Earnings</h2>
            <p>
              <strong>Available:</strong>
              <span className="ml-2">{riderProfile?.earnings} ETH</span>
            </p>
          </div>
        </div>

        {/* Withdraw Section */}
        <div className="bg-green-400 p-4 rounded-xl shadow text-black">
          <div className="mx-60">
            <h2 className="text-xl font-semibold mb-2">💸 Withdraw Earnings</h2>
            <input
              type="number"
              placeholder="Amount in ETH"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
            <button
              onClick={() => onWithdraw(withdrawAmount)}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* Assigned Trips Section */}
        <div className="bg-white p-4 rounded-xl shadow text-black">
          <h2 className="text-xl font-semibold mb-2">📦 Recent Assigned Trip Details</h2>
          {!showTripInfo && !riderProfile?.isRegistered ? (
            <p className="text-gray-500">No trips assigned yet.</p>
          ) : (
            <div className="border-b py-2 flex justify-between items-center">
              <div>
                <p>Trip #{tripInfo?.tripId ? Number(tripInfo.tripId) + 1 : "N/A"}</p>

                <p>Rider: {tripInfo.rider}</p>
                <p>Client: {tripInfo.client}</p>
                <p>Fare: {tripInfo.fare} ETH</p>
              </div>
              <div>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    riderProfile.isCompleted ? "bg-green-100 text-green-700" : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {tripInfo.isCompleted ? "Completed" : "In Progress"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
