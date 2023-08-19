import { configureStore } from "@reduxjs/toolkit";
import authResponseReducer from "./features/authResponseSlice";
import tokenResponseReducer from "./features/tokenResponseSlice";

export const store = configureStore({
    reducer: {
        authResponse: authResponseReducer,
        tokenResponse: tokenResponseReducer
    }
});