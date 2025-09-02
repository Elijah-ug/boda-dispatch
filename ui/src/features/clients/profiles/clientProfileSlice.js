import { createSlice } from "@reduxjs/toolkit";
import { fetchClientProfileThunk } from "./clientProfileThunk";

const initialState = {
  clientProfile: {
  isRegistered: false,
  balance: "0",
  clientId: null,
  user: null,
  hasSomeBalance: false,
  },

  loading: false,
  error: null,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.clientProfile = action.payload;
      })
      .addCase(fetchClientProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default clientSlice.reducer;
