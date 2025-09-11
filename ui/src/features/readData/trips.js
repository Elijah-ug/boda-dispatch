import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAvailableTrips = createAsyncThunk("trips/fetchAvailableTrips", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(import.meta.env.VITE_TRIPS_URL);
    const newTrips = await res.json();
    console.log(newTrips);
    return newTrips;
  } catch (error) {
    console.log(error.message);
    return rejectWithValue(error.message);
  }
});
