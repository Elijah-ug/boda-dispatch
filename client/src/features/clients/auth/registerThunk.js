import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../../contract/contract";

export const fetchRegisterClientThunk = createAsyncThunk(
    "register/fetchRegisterClientThunk",
    async (_, { rejectWithValue }) => {
      try {
        const contract = await getContract();
        console.log("Contract Address:", contract.target);

        // 🔥 You forgot `await` here!
        const tx = await contract.registerClient(); // ⬅️ Await this
          await tx.wait(); // wait for it to be mined

        toast.success("Client registered successfully!");
        return true;
      } catch (error) {
          toast.error("Registration failed");

        return rejectWithValue(error.message);
      }
    }
  );
