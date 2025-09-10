import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerTripEndPoint = createAsyncThunk(
  "trip/registerTripEndPoint",
  async (tripInfo, { rejectWithValue }) => {
    console.log("payload:", tripInfo);

    try {
      const res = await fetch(import.meta.env.VITE_TRIPS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripInfo),
      });
      if (!res.ok) {
        throw new Error(`An error occured: ${res}`);
      }
      const data = await res.json();
      console.log(tripInfo);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
