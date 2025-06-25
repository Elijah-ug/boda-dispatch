import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../features/wallet/walletSlice";
import clientSliceReducer from "../features/clients/profiles/clientProfileSlice";
import riderSliceReducer from "../features/riders/profiles/riderSlice";
export const store = configureStore({
    reducer: {
        "auth": authSliceReducer,
        "client": clientSliceReducer,
        "rider": riderSliceReducer,
    }

})
