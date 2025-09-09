import { createAsyncThunk } from "@reduxjs/toolkit";

export const transactionDetailsRoute = createAsyncThunk(
  "tx/transactionDetails",
  async (txDetails, { rejectWithValue }) => {
    console.log("posting to backend:", import.meta.env.VITE_TX_URL);
    console.log("payload:", txDetails);

    try {
      const res = await fetch(import.meta.env.VITE_TX_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(txDetails),
      });
      if (!res.ok) {
        throw new Error(`An error occured: ${res}`);
      }
      const data = await res.json();
      console.log(txDetails);
      return data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);
