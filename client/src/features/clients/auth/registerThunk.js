import { createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import { getContract } from "../../../contract/contract";
export const fetchRegisterClientThunk = createAsyncThunk(
    "register/fetchRegisterClientThunk",
    async (_, { rejectWithValue }) => {
        try {
            const contract = await getContract();
            const register = contract.registerClient();
            await register.wait();
            toast.success("Client registered successifully!");
            console.log(register)
            return true;
        } catch (error) {
            toast.error("Registration failed");
            return rejectWithValue(error.message);
        }
    }
)
