import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../../contract/contract";
import {toast} from "react-toastify"
export const fetchClientProfileThunk = createAsyncThunk(
    "rider/fetchRegisterRiderThunk",
    async ({address}, { rejectWithValue }) => {
        try {
            const contract = await getContract();
            const clientInfo = contract.getClientInfo(address);
            return clientInfo;
            // await register.wait();
            // toast.success("Client registered successifully!");

        } catch (error) {
            rejectWithValue(error.message);
        }
    }
)
