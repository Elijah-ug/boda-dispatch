import { createSlice } from "@reduxjs/toolkit";
import { fetchRiderProfileThunk } from "./riderProfileThunk";

const initialState = {
  riderProfile: {
    riderId: 0,
    user: null,
    earnings: "0",
    stars: 0,
    totalTrips: 0,
    isRegistered: false,

  },
  loading: false,
  error: null,


};

const riderSlice = createSlice({
  name: "rider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRiderProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRiderProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.riderProfile = action.payload;
      })
      .addCase(fetchRiderProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default riderSlice.reducer;
