import { createAsyncThunk } from '@reduxjs/toolkit';
import { getContract } from '../../../contract/contract';
import { formatUnits } from 'ethers';

export const platformPerceintageFee = createAsyncThunk(
  'fees/platformPerceintageFee',
  async (_, { rejectWithValue }) => {
    try {
      const contract = await getContract();
      const fees = await contract.percentageFee();
      const perceitFee = fees.toString() / 1000;
      console.log('perceitFee ' + perceitFee);
      return perceitFee;
    } catch (error) {
      console.error('❌ Error fetching client info', error.message);
      return rejectWithValue(error.message);
    }
  }
);
