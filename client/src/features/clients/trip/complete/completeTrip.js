import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../../contract/contract";
import {toast} from "react-toastify"
export const fetchCompleteTripThunk = createAsyncThunk(
    "rider/fetchRegisterRiderThunk",
    async (_, { rejectWithValue }) => {
        try {
            const contract = await getContract();
            const start = await contract.completeTrip();
            await start.wait()
            toast.success("Trip Completed successifully!");
            return start;

        } catch (error) {
            rejectWithValue(error.message);
        }
    }
)
