import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

// Components
import NavLink from "./NavLink";

// Hooks
import useRole from "../hooks/useRole";

// Utils
import { isEmployee, isEmployer } from "../utils/helpers/roles";

const Navigation = () => {
  const role = useRole();

  return (
    <div className="flex max-w-[1240px] justify-between max-sm:justify-center items-center bg-[#131315] mx-auto px-8 py-4 max-lg:mx-2 rounded-[999px] mt-6">
      <div className="flex justify-start items-center gap-x-8 gap-y-8 max-md:gap-3 max-sm:hidden">
        <NavLink to="/">HOME</NavLink>

        {isEmployee(role) && (
          <>
            <NavLink to="/cv">CV</NavLink>
            <NavLink to="/jobs">JOBS</NavLink>
          </>
        )}

        {isEmployer(role) && (
          <>
            <NavLink to="/job">JOB</NavLink>
            <NavLink to="/applicants">APPLICANTS</NavLink>
          </>
        )}

        <NavLink to="/about">ABOUT</NavLink>
      </div>

      <div className="rainbowkit-box">
        <div className="rainbowkit-connect-btn">
          <ConnectButton
            showBalance={false}
            chainStatus="icon"
            accountStatus="address"
            className="flex justify-end items-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
