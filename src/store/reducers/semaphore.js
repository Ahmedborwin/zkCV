import { createSlice } from "@reduxjs/toolkit";

export const semaphore = createSlice({
    name: 'semaphore',
    initialState: {
        contract: null,
    },
    reducers: {
        setContract: (state, action) => {
            state.contract = action.payload;
        },
    }
})

export const {
    setContract
} = semaphore.actions;

export default semaphore.reducer;