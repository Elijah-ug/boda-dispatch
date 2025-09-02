import { getContract } from '@/contract/contract';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const withdrawFeesThunk = createAsyncThunk('withdraw/withdrawFeesThunk', async ({ amount }, { rejectWithValue }) => {
  try {
    const contract = await getContract();
      const tx = await contract.withdrawFees(amount);
      await tx.wait();
    console.log(tx);
    toast.success('Withdraw Succeeded');
    return true;
  } catch (error) {
    console.log(error.message);
    toast.error('Withdraw Failed');
    return rejectWithValue(error.message);
  }
});
