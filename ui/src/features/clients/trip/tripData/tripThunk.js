import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../../../contract/contract";
import { formatEther } from "ethers";

export const fetchTripThunk = createAsyncThunk("trips/fetchTripThunk", async (_, { rejectWithValue }) => {
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
      startTime: trip.startTime.toString(),
      endTime: trip.endTime.toString(),
      duration: trip.duration.toString(),
      tripId: trip.tripId.toString(),
      tripStarted: trip.tripStarted,
      isCompleted: trip.isCompleted,
      isPaidOut: trip.isPaidOut,
    };
    return tripInfo;
  } catch (error) {
    console.error("❌ Error fetching trip info", error.message);
    return rejectWithValue(error.message);
  }
});
