import React from "react"
import TestAttestation from "../components/TestAttestation"

import useWalletConnected from "../hooks/useAccount"

const HomePage = () => {
    const { chain, address } = useWalletConnected()

    return (
        <div>
            <h1 className="text-white">TEST</h1>
            <TestAttestation />
        </div>
    )
}

export default HomePage
