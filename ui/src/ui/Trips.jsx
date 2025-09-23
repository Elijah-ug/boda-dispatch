import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentTripId } from "../features/clients/trip/tripData/currentTripIdThunk";
import { fetchTripThunk } from "../features/clients/trip/tripData/tripThunk";
import { fetchCompleteTripThunk } from "../features/clients/trip/complete/completeTrip";
import { toast } from "react-toastify";
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { bodaContractConfig } from "@/contract/wagmiContractConfig";
import { registerTripEndPoint } from "@/features/public/tripRoute";
import { formatEther, formatUnits } from "ethers";
import { waitForTransactionReceipt } from "viem/actions";
import { Button } from "@/components/ui/button";
import { wagmiConfig } from "@/wagmiConfig";

export default function Trips() {
  const dispatch = useDispatch();
  const { data: nextTripId } = useReadContract({
    ...bodaContractConfig,
    functionName: "nextTripId",
  });
  const newTripId = nextTripId ? String(nextTripId - 1n) : undefined;
  const {
    data: tripInfo,
    error: tripError,
    isPending: tripPending,
    refetch: refetchTripInfo,
  } = useReadContract({
    ...bodaContractConfig,
    functionName: "getTripDetails",
    args: nextTripId ? [newTripId] : undefined,
    enabled: !!newTripId,
    watch: true,
  });
  console.log("TripInfo: ==>", tripInfo);

  const { writeContractAsync: completeTrip, pending: completePending } = useWriteContract();
  const { writeContractAsync: startTrip, pending: startPending } = useWriteContract();

  const handleTriggerTrip = async (trigger) => {
    if (trigger === "complete") {
      const parsedTripId = tripInfo?.tripId.toString();
      const complete = await completeTrip({
        ...bodaContractConfig,
        functionName: "completeTrip",
        args: [parsedTripId],
      });
      await waitForTransactionReceipt(wagmiConfig, { hash: complete });
      await refetchTripInfo();
      toast.success("Trip Completed");
    } else if (trigger === "start") {
      const parsedTripId = tripInfo?.tripId.toString();
      const complete = await startTrip({
        ...bodaContractConfig,
        functionName: "tripStarted",
        args: [parsedTripId],
      });
      await waitForTransactionReceipt(wagmiConfig, { hash: complete });
      await refetchTripInfo();
      toast.success("Trip Completed");
    }
  };
  useEffect(() => {
    if (tripInfo) {
      const formattedTrip = {
        fare: formatEther(tripInfo.fare.toString()),
        rider: tripInfo.rider,
        client: tripInfo.client,
        distance: tripInfo.distance.toString(),
        tripId: tripInfo.tripId.toString(),
        isAccepted: tripInfo.isAccepted,
        tripStarted: tripInfo.tripStarted,
        isCompleted: tripInfo.isCompleted,
        isPaidOut: tripInfo.isPaidOut,
        pickup: tripInfo.pickup,
        destination: tripInfo.destination,
      };
      dispatch(registerTripEndPoint(formattedTrip));
    }
  }, [tripInfo]);
  // console.log("TripId Type is", typeof tripInfo?.tripId.toString());
  return (
    <div>
      <div className="bg-gray-700 text-white p-4 rounded-xl shadow col-span-1 md:col-span-2">
        <h2 className="text-xl font-semibold mb-2">📦 Recent Trip Details</h2>
        {tripInfo ? (
          <div className="border-b py-2 flex justify-between items-center gap-4">
            <div>
              <p>Trip #{tripInfo && tripInfo?.tripId + 1}</p>
              <p>
                <span>Rider:</span>
                <span className="text-blue-400 pl-2">
                  {tripInfo?.rider?.slice(0, 7)}...{tripInfo?.rider?.slice(-5)}
                </span>
              </p>
              <p>
                <span>Client:</span>
                <span className="text-blue-400 pl-2">
                  {tripInfo?.client?.slice(0, 7)}...{tripInfo?.client?.slice(-5)}
                </span>
              </p>
              <p>
                <span>Fare:</span>
                <span className="text-blue-500 pl-2">{`${formatUnits(tripInfo?.fare) + " AFB"}`}</span>
              </p>
              <p>
                <span>Completed Status:</span>
                {tripInfo?.isCompleted ? (
                  <span className="text-green-400 pl-2">✅ Completed</span>
                ) : (
                  <span className="text-red-400 pl-2">Pending</span>
                )}
              </p>
              <p>
                <span>Paid Status:</span>
                {tripInfo?.isPaidOut
                  ? "✅ Trip Paid"
                  : tripInfo?.isCompleted
                  ? "✅ Trip Completed"
                  : tripInfo?.tripStarted
                  ? "✅ Trip Started"
                  : tripInfo?.isAccepted
                  ? "✅ Trip Accepted"
                  : "Looking For Rider"}
              </p>
            </div>
            {tripInfo?.tripStarted && !tripInfo?.isCompleted ? (
              <Button onClick={() => handleTriggerTrip("complete")}>Complete Trip</Button>
            ) : !tripInfo?.tripStarted && tripInfo?.isAccepted ? (
              <Button onClick={() => handleTriggerTrip("start")}>Start Trip</Button>
            ) : null}
          </div>
        ) : (
          <div className="w-50">
            <p className="text-gray-500">No trips yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
