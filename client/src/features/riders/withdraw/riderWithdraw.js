import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../../contract/contract";
import {toast} from "react-toastify"
export const fetchRiderWithdrawThunk = createAsyncThunk(
    "withdraw/fetchRiderWithdrawThunk",
    async ({amount}, { rejectWithValue }) => {
        try {
            const contract = await getContract();
            const withdraw = contract.riderWithdrawEarnings(amount);
            await withdraw.wait()
            toast.success("Trip Completed successifully!");
            return withdraw;

        } catch (error) {
            rejectWithValue(error.message);
        }
    }
)
