import { getContract } from "@/contract/contract";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const updateFees = createAsyncThunk('update/updateFees', async ({ fee }, { rejectWithValue }) => {
    try {
        const contract = await getContract();
        const tx = await contract.updatePlatformPercentageFee(fee);
        console.log(tx);
        toast.success("Fees Updated")
        return true;
    } catch (error) {
        console.log(error.message);
        toast.error('Fees Updat Failed');
        return rejectWithValue(error.message);
    }
});
