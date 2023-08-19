import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {},
};

export const tokenResponseSlice = createSlice({
    name: "authResponse",
    initialState,
    reducers: {
        requestToken: (state, action) => {
            state.value = action.payload;
        }
    },
});

export default tokenResponseSlice.reducer;