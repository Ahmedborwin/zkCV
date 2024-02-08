import React from "react";

// Components
import TestAttestation from "../components/TestAttestation";

const HomePage = () => (
  <div className="flex flex-col items-center my-2">
    <div className="flex w-3/4 flex-col bg-[#131315] px-12 py-10 rounded-3xl my-2">
      <TestAttestation />
    </div>
  </div>
);

export default HomePage;
