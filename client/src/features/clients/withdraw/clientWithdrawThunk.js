import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../../contract/contract";
import {toast} from "react-toastify"
export const fetchClinetWithdrawThunk = createAsyncThunk(
    "withdraw/fetchClinetWithdrawThunk",
    async ({amount}, { rejectWithValue }) => {
        try {
            const contract = await getContract();
            const withdraw = await contract.clientWithdraw(amount);
            await withdraw.wait()
            toast.success("Trip Completed successifully!");
            return start;

        } catch (error) {
            rejectWithValue(error.message);
        }
    }
)
