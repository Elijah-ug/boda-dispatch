import { createSlice } from "@reduxjs/toolkit";
import { fetchTripThunk } from "./tripThunk";

const initialState = {
  tripInfo: {
    fare: "0",
    rider: "",
    client: null,
    distance: "",
    startTime: "",
    endTime: "",
    duration: "",
    tripId: "0",
    isAccepted: false,
    tripStarted: false,
    isCompleted: false,
    isPaidOut: false,
  },
  loading: false,
  error: null,
};
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
      });
  },
});
export default tripInfoSlice.reducer;
