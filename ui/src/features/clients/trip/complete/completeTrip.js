import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getContract } from "../../../../contract/contract";
import { fetchTripEndPoint } from "../route/tripendpoint";
export const fetchCompleteTripThunk = createAsyncThunk(
  "complete/fetchCompleteTripThunk",
  async ({ tripId }, { rejectWithValue, dispatch }) => {
    try {
      const contract = await getContract();
      const complete = await contract.completeTrip(tripId);
      await complete.wait();
      await dispatch(fetchTripEndPoint());
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
