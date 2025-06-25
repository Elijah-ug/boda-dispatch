import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../../contract/contract";
import {toast} from "react-toastify"
export const fetchClientDepositThunk = createAsyncThunk(
    "rider/fetchRegisterRiderThunk",
    async ({amount}, { rejectWithValue }) => {
        try {
            const contract = await getContract();
            const register = await contract.clientDeposit(amount);
            await register.wait();
            toast.success("Client registered successifully!");

        } catch (error) {
            rejectWithValue(error.message);
        }
    }
)
