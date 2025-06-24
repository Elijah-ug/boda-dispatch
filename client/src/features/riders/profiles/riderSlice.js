import { createSlice } from "@reduxjs/toolkit";
import { fetchRiderProfileThunk } from "./riderProfileThunk";

const initialState = {
  isRegistered: false,
  earnings: "0",
  stars: 0,
  totalTrips: 0,
    riderId: null,
    user: null,
  loading: false,
  error: null,


};

const riderSlice = createSlice({
  name: "rider",
  initialState,
  reducers: {
    resetRider: (state) => {
      state.isRegistered = false;
      state.earnings = "0";
      state.stars = 0;
      state.totalTrips = 0;
      state.riderId = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRiderProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRiderProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isRegistered = action.payload.isRegistered;
        state.earnings = action.payload.earnings;
        state.stars = action.payload.stars;
        state.totalTrips = action.payload.totalTrips;
        state.riderId = action.payload.riderId;
        state.user = action.payload.user;
      })
      .addCase(fetchRiderProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetRider } = riderSlice.actions;
export default riderSlice.reducer;
