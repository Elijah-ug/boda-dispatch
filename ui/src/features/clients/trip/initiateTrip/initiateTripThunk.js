import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getContract } from "../../../../contract/contract";
export const fetchInitiateTripThunk = createAsyncThunk(
  "rider/fetchInitiateTripThunk",
  async ({ pickup, destination, distance, fare }, { rejectWithValue }) => {
    try {
      const contract = await getContract();
      const start = await contract.initiateTrip(pickup, destination, distance, fare);
      const trip = await start.wait();
      toast.success("Trip Started successifully!");
      console.log(trip);
      return trip;
    } catch (error) {
      console.log(error);
      toast.error("Trip start Failed");
      return rejectWithValue(error.message);
    }
  }
);
