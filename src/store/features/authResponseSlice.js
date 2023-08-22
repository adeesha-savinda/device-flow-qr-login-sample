import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IDP_DEVICE_AUTH_URL, CLIENT_ID } from '../../config';

const initialState = {
    value: {},
    loading: 'idle',
    error: null
};

// Intiate device authorization flow
export const requestAuth = createAsyncThunk('atuthResponse/requestAuth', async () => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
        },
        body: `client_id=${CLIENT_ID}`,
    };

    const response = await fetch(IDP_DEVICE_AUTH_URL, params);
    const data = await response.json();

    console.log(data);

    return data;

});

export const authResponseSlice = createSlice({
    name: "authResponse",
    initialState: initialState,
    reducers: {
        setAuthResponse: (state, action) => {
            state.value = action.payload;
        },
        resetAuthResponse: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(requestAuth.pending, (state) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        })
        builder.addCase(requestAuth.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.value = action.payload;
            }
        })
        builder.addCase(requestAuth.rejected, (state) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = 'Error Occured'
            }
        })
    }
});

export const { setAuthResponse, resetAuthResponse } = authResponseSlice.actions;
export const getCurrentAuthResponse = (state) => state.authResponse.value;
export default authResponseSlice.reducer;