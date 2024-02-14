import React, { useState } from "react";
import { ethers } from "ethers";

// Semaphore
import { Identity } from "@semaphore-protocol/identity";
import { Group } from "@semaphore-protocol/group";

// Components
import SubmitButton from "./common/Button/SubmitButton";
import FormField from "./common/Form/FormField";
import FormBox from "./common/Form/FormBox";

import useAccount from "../hooks/useAccount";

const CreateJobAdd = (jobAddCount = 0) => {
    const [editMode, setEditMode] = useState(false);
    const [position, setPosition] = useState(null);
    const [experience, setExperience] = useState(null);
    const [skills, setSkills] = useState(null);

    const { accountDetails } = useAccount();
    const address = accountDetails.address;

    const handlePostJobAdd = () => {
        // create identity 
        const identity = new Identity(`${address}/${position}`);

        // create group
        const newId = ethers.toBigInt(`1`);
        const newJobAdd = new Group(newId, 20);
        newJobAdd.addMember(identity.commitment);

        // save group 
        console.log(newJobAdd, "@@@@newJobAdd");

        // post job add 
        setEditMode(false);
    }

    return (
        <>
            {!editMode && (
                <div className="flex justify-center">
                    <SubmitButton onClick={() => setEditMode(true)}>
                        NEW JOB ADD
                    </SubmitButton>
                </div>
            )}

            {editMode && (
                <FormBox>
                    <FormField
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    >
                        POSITION
                    </FormField>

                    <FormField
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                    >
                        YEARS OF EXPERIENCE
                    </FormField>

                    <SubmitButton onClick={handlePostJobAdd}>
                        POST JOB ADD
                    </SubmitButton>
                </FormBox>
            )}
        </>
    )
}

export default CreateJobAdd;