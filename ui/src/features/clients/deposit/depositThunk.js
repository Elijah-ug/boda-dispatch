import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "@/contract/contract";
import {toast} from "react-toastify"
import { fetchClientProfileThunk } from "../profiles/clientProfileThunk";
import { getTokenContract } from "@/contract/token";
import { ethers } from "ethers";
export const fetchClientDepositThunk = createAsyncThunk(
    "deposit/fetchClientDepositThunk",
    async ({amount, address}, { rejectWithValue, dispatch }) => {
        try {
            const contract = await getContract();
            const token = await getTokenContract();
            console.log('token target==>', token.target);
            console.log('contract target==>', contract.target);
            const decimals = await token.decimals();
            const parsedAmount = ethers.parseUnits(amount, decimals)
            // approve
            const approveTx = await token.approve(contract.target, parsedAmount);
            await approveTx.wait();

            const deposit = await contract.clientDeposit(parsedAmount);
            await deposit.wait();
            console.log("client deposited: ", deposit)
            toast.success("Client deposited successifully!");
        } catch (error) {
            console.log("Transaction Failed", error.message);
           return rejectWithValue(error.message);
        }
    }
)
