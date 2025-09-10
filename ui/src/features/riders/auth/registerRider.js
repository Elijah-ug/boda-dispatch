import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getContract } from "../../../contract/contract";
export const fetchRegisterRiderThunk = createAsyncThunk(
  "register/fetchRegisterRiderThunk",
  async (_, { rejectWithValue }) => {
    try {
      const contract = await getContract();
      const register = await contract.registerRider();
      await register.wait();
      toast.success("Rider registered successifully!");
      console.log(register);
      return true;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);
