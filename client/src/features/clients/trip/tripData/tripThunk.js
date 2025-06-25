import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../../../contract/contract";
import { formatEther } from "ethers";

export const fetchTripThunk = createAsyncThunk(
    "trips/fetchTripThunk",
    async ({ tripId }, { rejectWithValue }) => {
        try {
        const contract = await getContract();
        const trip = await contract.getTripDetails(tripId);
        const tripInfo = {
            tripId: trip.tripId.toString(),
            rider: trip.rider,
            client: trip.client,
            fare: formatEther(trip.fare.toString()),
            isCompleted: trip.isCompleted,
            isPaidOut: trip.isPaidOut,
        }
            return tripInfo;
        } catch (error) {
            console.error("❌ Error fetching trip info", error.message);
            toast.error("Failed to fetch trip info");
            return rejectWithValue(error.message);
        }

    }
)
