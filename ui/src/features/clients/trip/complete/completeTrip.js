import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getContract } from "../../../../contract/contract";
export const fetchCompleteTripThunk = createAsyncThunk(
  "complete/fetchCompleteTripThunk",
  async ({ tripId }, { rejectWithValue }) => {
    try {
      const contract = await getContract();
      const complete = await contract.completeTrip(tripId);
      await complete.wait();
      toast.success("Trip Completed successifully!");
      return {
        hash: complete.hash,
        from: complete.from,
        to: complete.to,
        gassLimit: complete.gassLimit?.toString() || "N/A",
      };
    } catch (error) {
      toast.error("Trip completeion failed");
      console.log("Error: " + error.message);
      return rejectWithValue(error.message);
    }
  }
);
