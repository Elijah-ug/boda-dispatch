import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../../contract/contract";
import {toast} from "react-toastify"
export const fetchClinetWithdrawThunk = createAsyncThunk(
    "withdraw/fetchClinetWithdrawThunk",
    async ({amount}, { rejectWithValue }) => {
        try {
            const contract = await getContract();
            const withdraw = await contract.clientWithdraw(amount);
            await withdraw.wait();
            console.log("Withdraw successful: ", withdraw);
            toast.success("Trip Completed successifully!");
            return start;

        } catch (error) {
            console.log("Transaction failed: ", error.message);
            return rejectWithValue(error.message);
        }
    }
)
