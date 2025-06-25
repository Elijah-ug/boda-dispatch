import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../../contract/contract";
import {toast} from "react-toastify"
export const fetchClientProfileThunk = createAsyncThunk(
    "client/fetchClientProfileThunk",
    async ({address}, { rejectWithValue }) => {
        try {
            const contract = await getContract();
            console.log(contract)
            const clientInfo = await contract.getClientInfo(address);
            console.log("clientInfo: ", clientInfo)
            // Destructure by index since it's returned as an array-like object
            const clientId = clientInfo[0].toString();
            const user = clientInfo[1];
            const balance = clientInfo[2].toString();
            const isRegistered = clientInfo[3];
            const hasSomeBalance = clientInfo[4];
            console.log(isRegistered)
      return { clientId, user, balance, isRegistered, hasSomeBalance, }
 } catch (error) {
            console.error("❌ Error fetching client info", error.message);
            return rejectWithValue(error.message);
        }
    }
)
