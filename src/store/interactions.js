import { ethers } from "ethers"

import { setProvider, setNetwork, setAccount } from "./reducers/provider"

import {
    setContract as setZKCVContract,
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
    chooseApplicationsRejected,
    getChosenCVIsLoading,
    getChosenCVSuccess,
    getChosenCVRejected,
} from "./reducers/zkCV"

import { setContract as setSemaphoreContract } from "./reducers/semaphore"

import zkCV_ABI from "../config/zkCV_ABI.json"
import semaphore_ABI from "../config/semaphore_ABI.json"

import zkCV_address from "../config/zkCV_address.json"
import semaphore_address from "../config/semaphore_address.json"

export const loadProvider = (dispatch) => {
    const provider = new ethers.BrowserProvider(window.ethereum)

    dispatch(setProvider(provider))

    return provider
}

export const loadNetwork = async (provider, dispatch) => {
    const { chainId } = await provider.getNetwork()
    if (chainId) dispatch(setNetwork(chainId))

    return chainId
}

export const loadAccount = async (dispatch) => {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
    const account = ethers.getAddress(accounts[0])
    console.log(account)
    dispatch(setAccount(account))

    return account
}

// ------------------------------------------------------------------------------
// LOAD CONTRACTS
export const loadZKCV = async (provider, chainId, dispatch) => {
    const zkCV = new ethers.Contract(zkCV_address[chainId], zkCV_ABI, provider)

    dispatch(setZKCVContract(zkCV))

    return zkCV
}

export const loadSemaphore = async (provider, chainId, dispatch) => {
    const semaphore = new ethers.Contract(semaphore_address[chainId], semaphore_ABI, provider)

    dispatch(setSemaphoreContract(semaphore))

    return semaphore
}

// ------------------------------------------------------------------------------
// LOAD GROUPS
export const loadGroups = async (zkCV, dispatch) => {
    const groupId = parseInt(await zkCV?.groupId())

    dispatch(setGroupId(groupId - 1))

    let vacancies = []
    for (let id = 1; id < groupId; id++) {
        // is live
        const isLive = await zkCV.vacancyIsLive(id)

        if (isLive) {
            const vacancy = await zkCV.applicationMapping(id)
            vacancies.push({
                id: id,
                experience: parseInt(vacancy[0]),
                title: vacancy[1],
            })
        }
    }

    dispatch(setGroups(vacancies))
}

// ------------------------------------------------------------------------------
// CREATE GROUP
export const createGroup = async (provider, zkCV, experience, title, dispatch) => {
    try {
        dispatch(createGroupIsLoading())

        const signer = await provider.getSigner()

        const transaction = await zkCV.connect(signer).createGroup(experience, title)

        await transaction.wait()

        dispatch(
            createGroupSuccess({
                group: { title: title, experience: experience },
                transactionHash: transaction.hash,
            })
        )
    } catch (error) {
        dispatch(createGroupRejected(error.message))
    }
}

// ------------------------------------------------------------------------------
// JOIN GROUP
export const joinGroup = async (provider, zkCV, identity, groupId, dispatch) => {
    try {
        dispatch(joinGroupIsLoading())

        const signer = await provider.getSigner()
        let transaction

        transaction = await zkCV.connect(signer).joinGroup(groupId, identity)

        await transaction.wait(1)

        dispatch(joinGroupSuccess({ transactionHash: transaction.hash }))

        return transaction.hash
    } catch (error) {
        dispatch(joinGroupRejected(error.message))
    }
}

// ------------------------------------------------------------------------------
// SUBMIT Application
export const submitApplication = async (
    provider,
    zkCV,
    groupId,
    cvHash,
    merkleTreeRoot,
    nullifierHash,
    proof,
    externalNullifier,
    dispatch
) => {
    // nullifierHash = identity.commitment.toString()
    try {
        dispatch(submitApplicationIsLoading())

        const signer = await provider.getSigner()

        const transaction = await zkCV
            .connect(signer)
            .submitCV(groupId, cvHash, merkleTreeRoot, nullifierHash, proof, externalNullifier)

        await transaction.wait()

        dispatch(submitApplicationSuccess({ transaction: transaction.hash }))

        return transaction
    } catch (error) {
        dispatch(submitApplicationRejected())
    }
}

// ------------------------------------------------------------------------------
// CHOOSE Applications
export const chooseApplications = async (provider, zkCV, groupId, selectedCVList, dispatch) => {
    // nullifierHash = identity.commitment.toString()
    console.log(provider, zkCV, selectedCVList)
    try {
        dispatch(chooseApplicationsIsLoading())

        const signer = await provider.getSigner()

        const transaction = await zkCV.connect(signer).setChosenCVHash(groupId, selectedCVList)

        await transaction.wait()

        dispatch(chooseApplicationsSuccess({ transaction: transaction.hash }))

        return transaction.hash
    } catch (error) {
        dispatch(chooseApplicationsRejected())
    }
}
// ------------------------------------------------------------------------------
// Get Chosen CV's from ZKcv Contract
export const getChosenCV = async (provider, zkCV, vacancyCount, dispatch) => {
    console.log(provider, zkCV, selectedCVList)
    try {
        dispatch(getChosenCVIsLoading())

        const signer = await provider.getSigner()

        console.log(vacancyCount)

        const cvHash = await zkCV.connect(signer).getChosenCVHash(vacancyCount)
        console.log("@@@cvHash", cvHash)

        await transaction.wait()

        dispatch(getChosenCVSuccess({ transaction: transaction.hash }))

        return transaction.hash
    } catch (error) {
        dispatch(getChosenCVRejected())
    }
}
