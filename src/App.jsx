import React from 'react';
import PageRoutes from './routes';

import { ConnectButton } from '@rainbow-me/rainbowkit';

// css
import '@rainbow-me/rainbowkit/styles.css';
import './App.css';

const App = () => {

  return (
    <div className="app-container">
      <div className="rainbowkit-box">
        <div className="rainbowkit-connect-btn">
          <ConnectButton />
        </div>
      </div>

      <PageRoutes />
    </div>
  );
};

export default App;