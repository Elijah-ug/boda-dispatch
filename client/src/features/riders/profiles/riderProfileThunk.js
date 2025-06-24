import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../../contract/contract";
import { toast } from "react-toastify";

export const fetchRiderProfileThunk = createAsyncThunk(
  "rider/fetchRiderProfileThunk",
  async ({ address }, { rejectWithValue }) => {
    try {
      const contract = await getContract();
      const riderInfo = await contract.getRiderInfo(address);
      return {
        isRegistered: riderInfo.isRegistered,
        earnings: riderInfo.earnings.toString(),
        stars: riderInfo.stars.toNumber(),
        totalTrips: riderInfo.totalTrips.toNumber(),
        riderId: riderInfo.riderId.toNumber(),
        user: riderInfo.user,
      };
    } catch (error) {
      toast.error("Failed to fetch rider info");
      return rejectWithValue(error.message);
    }
  }
);
