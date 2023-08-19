import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CLIENT_ID, GRANT_TYPE, IDP_TOKEN_URL } from "../../config";

export const requestToken = createAsyncThunk('tokenResponse/requestToken', async (authResponse) => {
    const formData = new URLSearchParams();

    formData.append('client_id', CLIENT_ID);
    formData.append('grant_type', GRANT_TYPE);
    formData.append('device_code', authResponse.device_code);
    formData.append('scope', 'openid profile');

    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
        },
        body: formData.toString(),
    };

    const response = await fetch(IDP_TOKEN_URL, params);
    const data = await response.json();

    console.log(data);

    return data;

});

export const tokenResponseSlice = createSlice({
    name: "authResponse",
    initialState: {
        value: {},
        lastIntervalId: null,
        latTimeoutId: null,
        loading: 'idle',
        polling: 'idle',
        error: null
    },
    reducers: {
        setLastIntervalId: (state, action) => {
            state.lastIntervalId = action.payload;
        },
        setLastTimeoutId: (state, action) => {
            state.setLastTimeoutId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(requestToken.pending, (state) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        })
        builder.addCase(requestToken.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.value = action.payload;
            }
        })
        builder.addCase(requestToken.rejected, (state) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = 'Error Occured'
            }
        })
    }
});

export const getCurrentTokenResponse = (state) => state.tokenResponse.value;
export const getLastIntervalId = (state) => state.tokenResponse.lastIntervalId;
export const getLastTimeoutId = (state) => state.tokenResponse.getLastTimeoutId;

export const { setLastIntervalId, setLastTimeoutId } = tokenResponseSlice.actions;
export default tokenResponseSlice.reducer;