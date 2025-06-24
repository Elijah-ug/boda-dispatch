import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../features/wallet/walletSlice";
import createSliceReducer from "../features/clients/profiles/clientProfileSlice";
import riderSliceReducer from "../features/riders/profiles/riderSlice";
export const store = configureStore({
    reducer: {
        "auth": authSliceReducer,
        "client": createSliceReducer,
        "rider": riderSliceReducer,
    }

})
