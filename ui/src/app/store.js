import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../features/wallet/walletSlice";
import clientSliceReducer from "../features/clients/profiles/clientProfileSlice";
import riderSliceReducer from "../features/riders/profiles/riderSlice";
import tripInfoSliceReducer from "../features/clients/trip/tripData/tripInfoSlice";
import feeSliceReducer from "../features/admin/fees/feeSlice";
import perceintageFeeSliceReducer from "../features/admin/fees/percentageFeeSlice";
import tripsEndpointSliceReducer from "../features/readData/tripsEndpointSlice";
export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    client: clientSliceReducer,
    rider: riderSliceReducer,
    trips: tripInfoSliceReducer,
    fees: feeSliceReducer,
    perceint: perceintageFeeSliceReducer,
    newTrip: tripsEndpointSliceReducer,
  },
});
