import { createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import { getContract } from "../../../contract/contract";
export const fetchRegisterRiderThunk = createAsyncThunk(
    "register/fetchRegisterRiderThunk",
    async (_, { rejectWithValue }) => {
        try {
            const contract = await getContract();
            console.log(contract.target)
            console.log("waiting waiting for interaction");
            const register = await contract.registerRider();
            console.log("waiting fr register");
            await register.wait();
            console.log("registered")
            toast.success("Client registered successifully!");
            console.log(register)
            return true;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
