import { ethers } from 'ethers';

import {
    setProvider,
    setNetwork,
    setAccount
} from "./reducers/provider";

import {
    setContract as setZKCVContract,
    setGroupId,
    setGroups,
    createGroupIsLoading,
    createGroupSuccess,
    createGroupRejected,
    joinGroupIsLoading,
    joinGroupSuccess,
    joinGroupRejected
} from "./reducers/zkCV";

import {
    setContract as setSemaphoreContract,
} from "./reducers/semaphore";

import zkCV_ABI from "../config/zkCV_ABI.json";
import semaphore_ABI from "../config/semaphore_ABI.json";

import zkCV_address from "../config/zkCV_address.json";
import semaphore_address from "../config/semaphore_address.json";

export const loadProvider = (dispatch) => {
    const provider = new ethers.BrowserProvider(window.ethereum);

    dispatch(setProvider(provider));

    return provider;
}

export const loadNetwork = async (provider, dispatch) => {
    const { chainId } = await provider.getNetwork();
    if (chainId)
        dispatch(setNetwork(chainId));

    return chainId;
}

export const loadAccount = async (dispatch) => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = ethers.getAddress(accounts[0]);

    dispatch(setAccount(account));

    return account;
}

// ------------------------------------------------------------------------------
// LOAD CONTRACTS
export const loadZKCV = async (provider, chainId, dispatch) => {
    const zkCV = new ethers.Contract(zkCV_address[chainId], zkCV_ABI, provider);

    dispatch(setZKCVContract(zkCV));
}

export const loadSemaphore = async (provider, chainId, dispatch) => {
    const semaphore = new ethers.Contract(semaphore_address[chainId], semaphore_ABI, provider);

    dispatch(setSemaphoreContract(semaphore));
}

// ------------------------------------------------------------------------------
// LOAD GROUPS
export const loadGroups = async (zkCV, dispatch) => {
    const groupId = parseInt(await zkCV.groupId());
    dispatch(setGroupId(groupId));

    const groups = await zkCV.applicationMapping();
    dispatch(setGroups(groups));
}

// ------------------------------------------------------------------------------
// CREATE GROUP
export const createGroup = async (provider, zkCV, experience, title, dispatch) => {
    try {
        dispatch(createGroupIsLoading());

        const signer = await provider.getSigner();

        const transaction = await zkCV.connect(signer)
            .createGroup(
                experience,
                title
            );

        await transaction.wait();

        dispatch(createGroupSuccess({
            group: { title: title, experience: experience },
            transactionHash: transaction.hash
        }));
    } catch (error) {
        dispatch(createGroupRejected(error.message));
    }
}

// ------------------------------------------------------------------------------
// JOIN GROUP
export const joinGroup = async (provider, zkCV, identity, groupId, dispatch) => {
    try {
        dispatch(joinGroupIsLoading());

        const signer = await provider.getSigner();
        let transaction;

        transaction = await zkCV.connect(signer)
            .joinGroup(groupId, identity);

        await transaction.wait();

        dispatch(joinGroupSuccess({ transactionHash: transaction.hash }));
    } catch (error) {
        dispatch(joinGroupRejected(error.message));
    }
}