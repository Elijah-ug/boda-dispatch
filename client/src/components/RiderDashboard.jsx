import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RiderDashboard = ({ riderData, assignedTrips, onWithdraw }) => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const dispatch = useDispatch();
  const { isRegistered, earnings, stars, totalTrips, user } = useSelector((state) => state.rider);
  console.log("isRegistered: ", isRegistered)
  return (
    <div className="bg-gray-700 min-h-screen text-white">
      <div className="p-6 mx-auto space-y-6 max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-6">Rider Dashboard</h1>

        {/* Rider Info Card */}
        <div className="p-4 rounded-xl shadow flex items-center justify-around gap-6 text-amber-400 bg-gray-800">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-white">🏍️ Rider Info</h2>
            <p><strong>Address:</strong> {riderData?.user}</p>
            <p><strong>Rider ID:</strong> {riderData?.riderId}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-white">⭐ Stats</h2>
            <p><strong>Stars:</strong> {riderData?.stars}</p>
            <p><strong>Total Trips:</strong> {riderData?.totalTrips}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-white">💰 Earnings</h2>
            <p><strong>Available:</strong> {riderData?.earnings} ETH</p>
          </div>
        </div>

        {/* Withdraw Section */}
              <div className="bg-white p-4 rounded-xl shadow text-black">
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
          <h2 className="text-xl font-semibold mb-2">📦 Assigned Trips</h2>
          {assignedTrips?.length === 0 ? (
            <p className="text-gray-500">No trips assigned yet.</p>
          ) : (
            assignedTrips?.map((trip, i) => (
              <div
                key={i}
                className="border-b py-2 flex justify-between items-center"
              >
                <div>
                  <p>Trip #{trip.tripId}</p>
                  <p>Client: {trip.client}</p>
                  <p>Fare: {trip.fare} ETH</p>
                </div>
                <div>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      trip.isCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {trip.isCompleted ? "Completed" : "In Progress"}
                  </span>
                </div>
              </div>
            ))
          )}
                  </div>
                  </div>
    </div>
  );
};

export default RiderDashboard;
