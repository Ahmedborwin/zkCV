export const selectProvider = state => state.provider?.provider;
export const selectChainId = state => state.provider?.chainId;
export const selectAccount = state => state.provider.account;

export const selectSemaphore = state => state.semaphore?.contract;
export const selectZKCV = state => state.zkCV?.contract;

export const selectGroupId = state => state.zkCV?.groupId;

