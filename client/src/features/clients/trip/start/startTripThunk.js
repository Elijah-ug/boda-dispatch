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
            console.log(start)
             return {
                hash: start.hash,
                from: start.from,
                to: start.to,
                gasLimit: start.gasLimit.toString(), // Convert BigInts
                value: start.value?.toString?.() ?? null, // if it has value
              };

        } catch (error) {
            toast.error("Trip start Failed")
            return rejectWithValue(error.message);
        }
    }
)
