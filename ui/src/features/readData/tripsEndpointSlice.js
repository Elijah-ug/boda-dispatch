import { createSlice } from "@reduxjs/toolkit";
import { fetchAvailableTrips } from "./trips";

const initialState = {
  newTrips: [],
  loading: false,
  error: null,
};

const tripsEndpointSlice = createSlice({
  name: "newTrip",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.newTrips = action.payload;
      })
      .addCase(fetchAvailableTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default tripsEndpointSlice.reducer;
