import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/api";
import authSlice from "./features/auth/authSlice";
import modalSlice from "./features/modal/modalSlice";

export const reduxStore = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authSlice,
        modal:modalSlice
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware)
})