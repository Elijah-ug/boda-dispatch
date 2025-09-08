import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getContract } from "../../../../contract/contract";
export const fetchInitiateTripThunk = createAsyncThunk(
  "rider/fetchRegisterRiderThunk",
  async ({ pickup, destination, distance, fare }, { rejectWithValue }) => {
    try {
      const contract = await getContract();
      const start = await contract.initiateTrip(pickup, destination, distance, fare);
      await start.wait();
      toast.success("Trip Started successifully!");
      //   console.log(start);
      return true;
    } catch (error) {
      console.log(error.message);
      toast.error("Trip start Failed");
      return rejectWithValue(error.message);
    }
  }
);
