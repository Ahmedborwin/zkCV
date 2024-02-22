import { createSelector } from "reselect"
import { ethers } from "ethers"

export const selectProvider = (state) => state.provider?.provider
export const selectChainId = (state) => state.provider?.chainId
export const selectAccount = (state) => state.provider.account

export const selectSemaphore = (state) => state.semaphore?.contract
export const selectZKCV = (state) => state.zkCV?.contract

export const selectGroupId = (state) => state.zkCV?.groupId
export const selectGroups = (state) => state.zkCV?.groups

export const groupsSelector = createSelector(selectGroups, (groups) => {
    if (!groups || groups.length === 0) {
        return
    }

    const allGroups = groups.reduce((acc, group) => {
        const experience = group[0] ? parseInt(group[0]) : 0

        const groupDetails = {
            experience: experience,
            title: group[1],
        }

        if (groupDetails) acc.push(groupDetails)

        return acc
    }, [])

    return allGroups
})
