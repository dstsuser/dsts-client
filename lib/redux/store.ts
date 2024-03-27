import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/api";
import authSlice from "./features/auth/authSlice";

export const reduxStore = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authSlice,
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware)
})