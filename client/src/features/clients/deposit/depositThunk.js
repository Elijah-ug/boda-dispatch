import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../../contract/contract";
import {toast} from "react-toastify"
import { fetchClientProfileThunk } from "../profiles/clientProfileThunk";
export const fetchClientDepositThunk = createAsyncThunk(
    "deposit/fetchClientDepositThunk",
    async ({amount}, { rejectWithValue, dispatch }) => {
        try {
            const contract = await getContract();
            const deposit = await contract.clientDeposit({value: amount});
            await deposit.wait();
            console.log("client deposited: ", deposit)
            toast.success("Client deposited successifully!");
            dispatch(fetchClientProfileThunk(user));
        } catch (error) {
            console.log("Transaction Failed", error.message);
           return rejectWithValue(error.message);
        }
    }
)
