import React, { useEffect, useState } from "react";

// Semaphore
import useIdentity from "../hooks/useIdentity"
import { Group } from "@semaphore-protocol/group"

// Components
import SubmitButton from "./common/Button/SubmitButton"
import FormField from "./common/Form/FormField"
import FormBox from "./common/Form/FormBox"

// Contracts
import zkCV_ABI from "../config/zkCV_ABI.json"
import zkCV_AddressList from "../config/zkCV_address.json"

// Hooks
import useAccount from "../hooks/useAccount";

// Redux
import { useDispatch } from 'react-redux';

// Store
import { createGroup } from "../store/interactions";

const CreateJobAdd = (jobAddCount = 0) => {
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false)
    const [position, setPosition] = useState(null)
    const [experience, setExperience] = useState(null)

    const [createGroupReady, setCreateGroupReady] = useState(false)
    const [prepareCreateGroupReady, setPrepareCreateGroupReady] = useState(false)
    const { identity } = useIdentity();


    const handlePostJobAdd = async () => {
        // Create Group
        await createGroup(
            provider,
            zkCV,
            dispatch
        );

        const currentGroupId = groupId + 1;

        // Join Group
        await JoinGroups(
            provider,
            zkCV,
            identity,
            currentGroupId,
            dispatch
        )
    }

    useEffect(() => {
        if (createGroupReady) {
            createGroup()
        }
    }, [createGroupReady])

    return (
        <>
            {!editMode && (
                <div className="flex justify-center">
                    <SubmitButton onClick={() => setEditMode(true)}>NEW JOB ADD</SubmitButton>
                </div>
            )}

            {editMode && (
                <FormBox>
                    <FormField value={position} onChange={(e) => setPosition(e.target.value)}>
                        POSITION
                    </FormField>

                    <FormField value={experience} onChange={(e) => setExperience(e.target.value)}>
                        YEARS OF EXPERIENCE
                    </FormField>

                    <SubmitButton onClick={handlePostJobAdd}>POST JOB ADD</SubmitButton>
                </FormBox>
            )}
        </>
    )
}

export default CreateJobAdd
