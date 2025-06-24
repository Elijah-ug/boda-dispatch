import { createSlice } from "@reduxjs/toolkit";
import { fetchClientProfileThunk } from "./clientProfileThunk";

const initialState = {
  isRegistered: false,
  balance: "0",
  clientId: null,
  user: null,
  hasSomeBalance: false,
  loading: false,
  error: null,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    resetClient: (state) => {
      state.isRegistered = false;
      state.balance = "0";
      state.clientId = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isRegistered = action.payload.isRegistered;
        state.balance = action.payload.balance;
        state.clientId = action.payload.clientId;
        state.user = action.payload.user;
        state.hasSomeBalance = action.payload.hasSomeBalance;
      })
      .addCase(fetchClientProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetClient } = clientSlice.actions;
export default clientSlice.reducer;
