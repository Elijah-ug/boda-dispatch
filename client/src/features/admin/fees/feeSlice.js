import { createSlice } from '@reduxjs/toolkit';
import { platformFeeThunk } from './feeThunk';

const initialState = {
  platformFees: "0",
  loading: false,
  error: null,
};

const feeSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(platformFeeThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(platformFeeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.platformFees = action.payload;
      })
      .addCase(platformFeeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default feeSlice.reducer;
