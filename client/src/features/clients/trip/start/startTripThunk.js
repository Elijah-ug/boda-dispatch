import { createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import { getContract } from "../../../../contract/contract";
export const fetchStartTripThunk = createAsyncThunk(
    "rider/fetchRegisterRiderThunk",
    async ({rider, fare}, { rejectWithValue }) => {
        try {
            const contract = await getContract();
            const start = await contract.startTrip(rider, fare);
            await start.wait()
            toast.success("Trip Started successifully!");
            return start;

        } catch (error) {
            rejectWithValue(error.message);
        }
    }
)
