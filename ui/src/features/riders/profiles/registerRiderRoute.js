import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRiderEndPoint = createAsyncThunk(
  "rider/fetchRiderEndPoint",
  async (riderProfile, { rejectWithValue }) => {
    try {
      const res = await fetch(import.meta.env.VITE_RIDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(riderProfile),
      });
      if (!res.ok) {
        throw new Error(`An error occured:  ${res}`);
      }
      const data = await res.json();
      console.log(riderProfile);
      return data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);
