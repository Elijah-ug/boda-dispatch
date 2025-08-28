import { createAsyncThunk } from '@reduxjs/toolkit';
import { getContract } from '../../../contract/contract';
import { toast } from 'react-toastify';
import { formatEther } from 'ethers';

export const platformFeeThunk = createAsyncThunk('fees/platformFee', async ({ rejectWithValue }) => {
  try {
    const contract = await getContract();
    const fees = await contract.returnPlatformFees();
      const platformFees = formatEther(fees);
    console.log(platformFees);
    return platformFees;
  } catch (error) {
    console.error('❌ Error fetching client info', error.message);
    return rejectWithValue(error.message);
  }
});
