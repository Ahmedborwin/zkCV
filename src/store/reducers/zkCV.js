import { createSlice } from "@reduxjs/toolkit";

export const zkCV = createSlice({
    name: 'zkCV',
    initialState: {
        contract: null,
        groupId: 0,
        groups: [],
        createGroup: {
            isLoading: false,
            isSuccess: false,
            isRejected: false,
            transactionHash: null
        },
        joinGroup: {
            isLoading: false,
            isSuccess: false,
            isRejected: false,
            transactionHash: null
        },
        submitApplication: {
            isLoading: false,
            isSuccess: false,
            isRejected: false,
            transactionHash: null
        },
        chooseApplications: {
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
        setGroups: (state, action) => {
            state.groups = action.payload;
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

            // append group to groups
            state.groups.push([action.payload.group.experience, action.payload.group.title]);
        },
        createGroupRejected: (state) => {
            state.createGroup.isLoading = false;
            state.createGroup.isSuccess = false;
            state.createGroup.isRejected = true;
            state.createGroup.transactionHash = null;
        },
        joinGroupIsLoading: (state) => {
            state.joinGroup.isLoading = true;
            state.joinGroup.isSuccess = false;
            state.joinGroup.isRejected = false;
            state.joinGroup.transactionHash = null;
        },
        joinGroupSuccess: (state, action) => {
            state.joinGroup.isLoading = false;
            state.joinGroup.isSuccess = true;
            state.joinGroup.isRejected = false;
            state.joinGroup.transactionHash = action.payload.transactionHash;

            // increment groupId
            state.groupId = state.groupId + 1;
        },
        joinGroupRejected: (state) => {
            state.joinGroup.isLoading = false;
            state.joinGroup.isSuccess = false;
            state.joinGroup.isRejected = true;
            state.joinGroup.transactionHash = null;
        },
        submitApplicationIsLoading: (state) => {
            state.submitApplication.isLoading = true;
            state.submitApplication.isSuccess = false;
            state.submitApplication.isRejected = false;
            state.submitApplication.transactionHash = null;
        },
        submitApplicationSuccess: (state, action) => {
            state.submitApplication.isLoading = false;
            state.submitApplication.isSuccess = true;
            state.submitApplication.isRejected = false;
            state.submitApplication.transactionHash = action.payload.transactionHash;
        },
        submitApplicationRejected: (state) => {
            state.chooseApplications.isLoading = false;
            state.chooseApplications.isSuccess = false;
            state.chooseApplications.isRejected = true;
            state.chooseApplications.transactionHash = null;
        },
        chooseApplicationsIsLoading: (state) => {
            state.chooseApplications.isLoading = true;
            state.chooseApplications.isSuccess = false;
            state.chooseApplications.isRejected = false;
            state.chooseApplications.transactionHash = null;
        },
        chooseApplicationsSuccess: (state, action) => {
            state.chooseApplications.isLoading = false;
            state.chooseApplications.isSuccess = true;
            state.chooseApplications.isRejected = false;
            state.chooseApplications.transactionHash = action.payload.transactionHash;
        },
        chooseApplicationsRejected: (state) => {
            state.chooseApplications.isLoading = false;
            state.chooseApplications.isSuccess = false;
            state.chooseApplications.isRejected = true;
            state.chooseApplications.transactionHash = null;
        },
    }
})

export const {
    setContract,
    setGroupId,
    setGroups,
    createGroupIsLoading,
    createGroupSuccess,
    createGroupRejected,
    joinGroupIsLoading,
    joinGroupSuccess,
    joinGroupRejected,
    submitApplicationIsLoading,
    submitApplicationSuccess,
    submitApplicationRejected,
    chooseApplicationsIsLoading,
    chooseApplicationsSuccess,
    chooseApplicationsRejected
} = zkCV.actions;

export default zkCV.reducer;