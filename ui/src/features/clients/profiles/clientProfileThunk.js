import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../../contract/contract";
import { toast } from "react-toastify";
import { formatEther } from "ethers";
export const fetchClientProfileThunk = createAsyncThunk(
  "client/fetchClientProfileThunk",
  async ({ address }, { rejectWithValue, dispatch }) => {
    try {
      const contract = await getContract();
      console.log(contract);
      const clientInfo = await contract.getClientInfo(address);
      console.log("clientInfo: ", clientInfo);
      // Destructure by index since it's returned as an array-like object
      const clientProfile = {
        balance: formatEther(clientInfo[0].toString()),
        user: clientInfo[1],
        clientId: clientInfo[2].toString(),
        isRegistered: clientInfo[3],
        hasSomeBalance: clientInfo[4],
      };

      console.log("clientProfile " + clientProfile);
      return clientProfile;
    } catch (error) {
      console.error("❌ Error fetching client info", error.message);
      return rejectWithValue(error.message);
    }
  }
);
