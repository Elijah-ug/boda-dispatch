import { createSlice } from '@reduxjs/toolkit';
import { platformPerceintageFee } from './percentageFeeThunk';

const initialState = {
  perceitFee: '0',
  loading: false,
  error: null,
};

const perceintageFeeSlice = createSlice({
  name: 'perceint',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(platformPerceintageFee.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(platformPerceintageFee.fulfilled, (state, action) => {
        state.loading = false;
        state.perceitFee = action.payload;
      })
      .addCase(platformPerceintageFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default perceintageFeeSlice.reducer;
