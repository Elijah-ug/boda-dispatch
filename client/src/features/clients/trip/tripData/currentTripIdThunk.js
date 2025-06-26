import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../../../contract/contract";
import { toast } from "react-toastify";

export const fetchCurrentTripId = createAsyncThunk(
    "tripId/fetchCurrentTripId",
    async (_, { rejectWithValue }) => {
        try {
            const contract = await getContract();
            const nextTripId = await contract.nextTripId();
            const myTripId = nextTripId - 1n; // your last trip
            console.log("nextTripId id fetched: ", nextTripId.toString())
            console.log("myTripId id fetched: ", myTripId.toString())
        // dispatch(fetchCompleteTripThunk({ tripId: myTripId.toString() }));
        return myTripId.toString();
        } catch (error) {
            console.log("Trip id Failed: ", error.message)
            return rejectWithValue(error.message);

        }

    }
)
