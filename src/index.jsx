import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

// css
import "./index.css"
import "@rainbow-me/rainbowkit/styles.css"

// Config
import { configureApp } from "./utils/helpers/configureApp"

// RainbowKit
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import { WagmiConfig } from "wagmi"

// Redux 
import { Provider } from 'react-redux';

// Store
import { store } from "./store/store";

const { chains, wagmiClient } = configureApp()

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <WagmiConfig config={wagmiClient}>
            <RainbowKitProvider
                theme={darkTheme({
                    accentColor: "#7b3fe4",
                    accentColorForeground: "white",
                    borderRadius: "medium",
                })}
                chains={chains}
            >
                <Provider store={store}>
                    <App />
                </Provider>
            </RainbowKitProvider>
        </WagmiConfig>
    </React.StrictMode>
)
