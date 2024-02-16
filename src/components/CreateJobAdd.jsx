import React, { useState } from "react"

// Semaphore
import useIdentity from "../hooks/useIdentity"

// Components
import SubmitButton from "./common/Button/SubmitButton"
import FormField from "./common/Form/FormField"
import FormBox from "./common/Form/FormBox"

// Redux
import { useDispatch, useSelector } from "react-redux"

// Store
import { createGroup, joinGroup } from "../store/interactions"
import { selectProvider, selectGroupId, selectZKCV } from "../store/selectors"

const CreateJobAdd = () => {
    const dispatch = useDispatch()

    const provider = useSelector(selectProvider)
    const zkCV = useSelector(selectZKCV)
    const groupId = useSelector(selectGroupId)

    const [editMode, setEditMode] = useState(false)
    const [position, setPosition] = useState(null)
    const [experience, setExperience] = useState(null)

    const { identity } = useIdentity()

    const handlePostJobAdd = async () => {
        // Create Group
        await createGroup(provider, zkCV, experience, position, dispatch)

        //$$ why plus 1??
        const currentGroupId = groupId + 1

        // Join Group
        await joinGroup(provider, zkCV, identity.commitment, currentGroupId, dispatch)
    }

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
