import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getContract } from "../../../../contract/contract";
import { fetchTripThunk } from "../tripData/tripThunk";
export const fetchInitiateTripThunk = createAsyncThunk(
  "rider/fetchInitiateTripThunk",
  async ({ pickup, destination, distance, fare }, { rejectWithValue, dispatch }) => {
    try {
      const contract = await getContract();
      const nextTripId = await contract.nextTripId();
      const myTripId = nextTripId - 1n; // last trip
      const currentTripId = myTripId.toString();
      const start = await contract.initiateTrip(pickup, destination, distance, fare);
      const trip = await start.wait();
      const initiatedTrip = {
        hash: trip.hash,
        blockNumber: trip.blockNumber,
        gasUsed: trip.gasUsed.toString(),
        status: trip.status,
      };
      await dispatch(fetchTripThunk({ currentTripId }));
      toast.success("Trip Started successifully!");
      console.log(trip);
      return initiatedTrip;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
