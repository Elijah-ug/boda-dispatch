import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract, getSigner } from "@/contract/contract";
import { toast } from "react-toastify";
import { fetchClientProfileThunk } from "../profiles/clientProfileThunk";
import { getTokenContract } from "@/contract/token";
import { ethers } from "ethers";
import { data } from "react-router-dom";
import { transactionDetailsRoute } from "./txThunk";
export const fetchClientDepositThunk = createAsyncThunk(
  "deposit/fetchClientDepositThunk",
  async ({ amount }, { rejectWithValue, dispatch }) => {
    try {
      const contract = await getContract();
      const token = await getTokenContract();
      //   console.log('token target==>', token.target);
      //   console.log('contract target==>', contract.target);
      console.log("amount==>", amount, "typeof amount==>", typeof amount);
      // approve
      const approveTx = await token.approve(contract.target, amount);
      await approveTx.wait();
      // allow the spender
      const signer = await getSigner();
      const ownerAddress = await signer.getAddress();
      const allowance = await token.allowance(ownerAddress, contract.target);
      console.log("allowance ==>" + allowance);
      const tx = await contract.clientDeposit(amount);
      const deposit = await tx.wait();
      const txDetails = {
        txHash: String(deposit.hash),
        gasUsed: deposit.gasUsed?.toString(),
        to: String(deposit.to),
        from: String(deposit.from),
      };
      await dispatch(transactionDetailsRoute(txDetails));
      console.log("client deposited: ", deposit);
      console.log(txDetails);
      toast.success("Client deposited successifully!");
    } catch (error) {
      console.log("Transaction Failed", error.message);
      return rejectWithValue(error.message);
    }
  }
);
