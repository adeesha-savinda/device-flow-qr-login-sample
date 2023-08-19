import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const authResponseSlice = createSlice({
    name: "authResponse",
    initialState: {
        value: {}
    },
    reducers: {
        setAuthResponse: (state, action) => {
            state.value = action.payload;
        }
    },
});

export const requestAuth = createAsyncThunk('atuthResponse/requestAuth', async () => {
    
});

export const { setAuthResponse } = authResponseSlice.actions;
export const getCurrentAuthResponse = (state) => state.authResponse.value;
export default authResponseSlice.reducer;