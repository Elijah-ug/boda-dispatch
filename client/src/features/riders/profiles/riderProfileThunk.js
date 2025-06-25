import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../../contract/contract";
import { toast } from "react-toastify";
import { formatEther } from "ethers";

export const fetchRiderProfileThunk = createAsyncThunk(
  "rider/fetchRiderProfileThunk",
  async ({ address }, { rejectWithValue }) => {
    try {
      const contract = await getContract();
      const riderInfo = await contract.getRiderInfo(address);
      console.log(riderInfo)

      const riderData = {
        riderId: riderInfo[0].toString(),
        user: riderInfo[1],
        earnings: formatEther(riderInfo[2].toString()),
        stars: riderInfo[3].toString(),
        totalTrips: riderInfo[4].toString(),
        isRegistered: riderInfo[5]
      };

      // console.log(isRegistered)
      return riderData;
    } catch (error) {
      console.error("❌ Error fetching client info", error.message);
      return rejectWithValue(error.message);
    }
  }
);
