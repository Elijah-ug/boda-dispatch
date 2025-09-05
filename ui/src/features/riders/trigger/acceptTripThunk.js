import { getContract } from "@/contract/contract";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const acceptTripThunk = createAsyncThunk("accept/acceptTripThunk", async ({ tripId }, { rejectWithValue }) => {
  try {
    const contract = await getContract();
    const accept = await contract.acceptTripRequest(tripId);
    console.log("accepted: " + accept);
    return true;
  } catch (error) {
    console.log(error.message);
    return rejectWithValue(error.message);
  }
});
