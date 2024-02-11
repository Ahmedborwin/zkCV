import React, { useState } from "react";

// Components
import SubmitButton from "./common/Button/SubmitButton";
import FormField from "./common/Form/FormField";
import FormBox from "./common/Form/FormBox";

const CreateJobAdd = () => {
    const [editMode, setEditMode] = useState(false);
    const [position, setPosition] = useState(null);
    const [experience, setExperience] = useState(null);
    const [skills, setSkills] = useState(null);

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

                    <SubmitButton onClick={() => setEditMode(false)}>
                        POST JOB ADD
                    </SubmitButton>
                </FormBox>
            )}
        </>
    )
}

export default CreateJobAdd;