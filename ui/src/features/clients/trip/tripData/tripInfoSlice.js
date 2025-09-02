import { createSlice } from "@reduxjs/toolkit"
import { fetchTripThunk } from "./tripThunk"

const initialState = {
    tripInfo: {
        tripId: "0",
        rider: null,
        client: null,
        fare: "0",
        isCompleted: false,
        isPaidOut: false,
    },
    loading: false,
    error: null
}
const tripInfoSlice = createSlice({
    name: "trips",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTripThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTripThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.tripInfo = action.payload;
            })
            .addCase(fetchTripThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Unknown error";
        })
    }
})
export default tripInfoSlice.reducer;
