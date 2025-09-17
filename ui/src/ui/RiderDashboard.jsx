import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRiderProfileThunk } from "../features/riders/profiles/riderProfileThunk";
import { autoConnectWallet } from "../features/wallet/connectWallet";
import { fetchTripThunk } from "../features/clients/trip/tripData/tripThunk";
import { fetchCurrentTripId } from "../features/clients/trip/tripData/currentTripIdThunk";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAccount, useReadContract } from "wagmi";
import { bodaContractConfig } from "@/contract/wagmiContractConfig";

const RiderDashboard = ({ riderData, assignedTrips, onWithdraw }) => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  // const dispatch = useDispatch();
  // const { riderProfile } = useSelector((state) => state.rider);
  const { tripInfo } = useSelector((state) => state.trips);
  // const { address } = useSelector((state) => state.auth);
  // console.log("riderProfile.isRegistered: ", riderProfile.isRegistered);

  // useEffect(() => {
  //   dispatch(autoConnectWallet());
  //   dispatch(fetchRiderProfileThunk({ address }));
  // }, [address]);
  // useEffect(() => {
  //   dispatch(fetchCurrentTripId())
  //     .unwrap()
  //     .then((tripId) => {
  //       dispatch(fetchTripThunk({ tripId }));
  //     });
  // }, []);

  const { address } = useAccount();
  const {
    data: riderProfile,
    error,
    isPending,
  } = useReadContract({
    ...bodaContractConfig,
    functionName: "getRiderInfo",
    args: [address],
  });
  const showTripInfo = riderProfile?.user?.toLowerCase() === tripInfo?.rider?.toLowerCase();
  console.log("Number(tripInfo.tripId) : " + typeof Number(tripInfo.tripId));
  console.log("tripInfo.rider: ", tripInfo.rider);

  return (
    <div className=" min-h-screen px-3 sm:px-10 py-5 sm:py-10 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Rider Dashboard</h1>
      <div className="flex flex-col gap-6">
        {/* Rider Info Card */}
        <div className="p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-around gap-6 text-amber-400 bg-gray-800">
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
            <h2 className="text-xl font-semibold mb-2 text-white">⭐ Starts</h2>
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
        <div className="grid sm:grid-cols-2 gap-10">
          {/* Withdraw Section */}
          <div className="">
            <Card className="w-full max-w-lg bg-gray-100/30 text-white">
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={() => onWithdraw(withdrawAmount)}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="number"
                        placeholder="Amount in ETH"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Assigned Trips Section */}
          <div className="">
            <Card className="w-full max-w-lg bg-gray-100/30 text-white">
              <CardHeader>
                <CardTitle>📦 Recent Assigned Trip Details</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
            <h2 className="text-xl font-semibold mb-2"></h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
