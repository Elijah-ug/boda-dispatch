import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../../contract/contract";
import { toast } from "react-toastify";
import { transactionDetailsRoute } from "@/features/clients/deposit/txThunk";
export const fetchRiderWithdrawThunk = createAsyncThunk(
  "withdraw/fetchRiderWithdrawThunk",
  async ({ amount }, { rejectWithValue, dispatch }) => {
    try {
      const contract = await getContract();
      const tx = await contract.riderWithdrawEarnings(amount);
      const withdraw = await tx.wait();
      const txDetails = {
        txHash: String(withdraw.hash),
        gasUsed: withdraw.gasUsed?.toString(),
        to: String(withdraw.to),
        from: String(withdraw.from),
      };
      await dispatch(transactionDetailsRoute({ txDetails }));
      console.log("withdraw" + withdraw);
      toast.success("Trip Completed successifully!");
      return txDetails;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);
