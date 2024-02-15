import React, { useEffect } from 'react';
import PageRoutes from './routes';

// Components
import FadeIn from './components/common/Effects/FadeIn';
import Container from './components/common/Container/Basic';

// Redux
import { useDispatch } from 'react-redux';

// Store
import {
  loadProvider,
  loadNetwork,
  loadAccount,
  loadZKCV,
  loadSemaphore,
  loadGroups
} from './store/interactions';
import { useAccount } from 'wagmi';

const App = () => {
  const dispatch = useDispatch();

  const { isConnected } = useAccount();

  const loadBlockchainData = async () => {
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch);

    if (chainId) {
      await loadSemaphore(provider, chainId, dispatch);
      const zkCV = await loadZKCV(provider, chainId, dispatch);

      if (zkCV)
        await loadGroups(zkCV, dispatch);
    }
  };

  useEffect(() => {
    if (!window.ethereum) return; // Ensure Ethereum is available

    const handleChainChanged = () => {
      console.log('Chain changed, reloading page.');
      window.location.reload();
    };

    const handleAccountsChanged = async () => {
      await loadAccount(dispatch);
      localStorage.removeItem("identity");
    };

    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('accountsChanged', handleAccountsChanged);

    // Trigger initial load or state update
    isConnected && loadBlockchainData();

    return () => {
      window.ethereum.removeListener('chainChanged', handleChainChanged);
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, [isConnected, dispatch]);

  return (
    <Container>
      <FadeIn>
        <PageRoutes />
      </FadeIn>
    </Container>
  );
};

export default App;