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
  loadAccount
} from './store/interactions';
import { useAccount } from 'wagmi';

const App = () => {
  const dispatch = useDispatch();

  const { isConnected } = useAccount();

  const loadBlockchainData = async () => {
    // Initiate provider
    const provider = loadProvider(dispatch);

    // Fetch current network's chainId (e.g. hardhat: 31337, kovan: 42)
    const chainId = await loadNetwork(provider, dispatch);

    // Reload page when network changes
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    })

    // Fetch current account from Metamask when changed
    window.ethereum.on('accountsChanged', async () => {
      await loadAccount(dispatch);
      
      // clear localStorage identity
      localStorage.removeItem("identity");

      // reset router page
    })

    if (chainId) {
    }
  }

  useEffect(() => {
    isConnected && loadBlockchainData();
  }, [isConnected])

  return (
    <Container>
      <FadeIn>
        <PageRoutes />
      </FadeIn>
    </Container>
  );
};

export default App;