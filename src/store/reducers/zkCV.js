import { createSlice } from "@reduxjs/toolkit";

export const zkCV = createSlice({
    name: 'zkCV',
    initialState: {
        contract: null,
        groupId: 0,
        createGroup: {
            isLoading: false,
            isSuccess: false,
            isRejected: false,
            transactionHash: null
        }
    },
    reducers: {
        setContract: (state, action) => {
            state.contract = action.payload;
        },
        setGroupId: (state, action) => {
            state.groupId = action.payload;
        },
        createGroupIsLoading: (state) => {
            state.createGroup.isLoading = true;
            state.createGroup.isSuccess = false;
            state.createGroup.isRejected = false;
            state.createGroup.transactionHash = null;
        },
        createGroupSuccess: (state, action) => {
            state.createGroup.isLoading = false;
            state.createGroup.isSuccess = true;
            state.createGroup.isRejected = false;
            state.createGroup.transactionHash = action.payload.transactionHash;

            // increment groupId
            state.groupId = state.groupId + 1;
        },
        createGroupRejected: (state) => {
            state.createGroup.isLoading = false;
            state.createGroup.isSuccess = false;
            state.createGroup.isRejected = true;
            state.createGroup.transactionHash = null;
        }
    }
})

export const {
    setContract,
    setGroupId,
    createGroupIsLoading,
    createGroupSuccess,
    createGroupRejected
} = zkCV.actions;

export default zkCV.reducer;