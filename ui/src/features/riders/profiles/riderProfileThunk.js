import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../../contract/contract";
import { formatEther } from "ethers";
import { fetchRiderEndPoint } from "./registerRiderRoute";

export const fetchRiderProfileThunk = createAsyncThunk(
  "rider/fetchRiderProfileThunk",
  async ({ address }, { rejectWithValue, dispatch }) => {
    try {
      const contract = await getContract();
      const riderInfo = await contract.getRiderInfo(address);
      const riderProfile = {
        earnings: formatEther(riderInfo[2].toString()),
        user: riderInfo[1],
        riderId: riderInfo[0].toString(),
        completedTrips: riderInfo[4].toString(),
        totalTrips: riderInfo[3].toString(),
        isRegistered: riderInfo[5],
      };
      await dispatch(fetchRiderEndPoint(riderProfile));
      console.log(riderProfile);
      return riderProfile;
    } catch (error) {
      console.error("❌ Error fetching client info", error.message);
      return rejectWithValue(error.message);
    }
  }
);
