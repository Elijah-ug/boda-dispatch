import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTripEndPoint = createAsyncThunk(
  "trip/fetchTripEndPoint",
  async (clientProfile, { rejectWithValue }) => {
    try {
      const res = await fetch(import.meta.env.VITE_TRIPS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientProfile),
      });
      if (!res.ok) {
        throw new Error(`An error occured:  ${res}`);
      }
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);
