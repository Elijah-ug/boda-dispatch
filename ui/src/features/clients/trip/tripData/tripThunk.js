import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../../../contract/contract";
import { formatEther } from "ethers";
import { registerTripEndPoint } from "@/features/public/tripRoute";

export const fetchTripThunk = createAsyncThunk("trips/fetchTripThunk", async (_, { rejectWithValue, dispatch }) => {
  try {
    const contract = await getContract();
    const nextTripId = await contract.nextTripId();
    const myTripId = nextTripId - 1n; // last trip
    const currentTripId = myTripId.toString();
    console.log("nextTripId id fetched: ", nextTripId.toString());
    console.log("myTripId id fetched: ", myTripId.toString());
    const trip = await contract.getTripDetails(currentTripId);
    const tripInfo = {
      fare: formatEther(trip.fare.toString()),
      charges: formatEther(trip.charges.toString()),
      rider: trip.rider,
      client: trip.client,
      distance: trip.distance.toString(),
      tripId: trip.tripId.toString(),
      tripStarted: trip.tripStarted,
      isCompleted: trip.isCompleted,
      isPaidOut: trip.isPaidOut,
      pickup: trip.pickup,
      destination: trip.destination,
    };
    console.log(tripInfo);
    await dispatch(registerTripEndPoint(tripInfo));
    return tripInfo;
  } catch (error) {
    console.error("❌ Error fetching trip info", error.message);
    return rejectWithValue(error.message);
  }
});
