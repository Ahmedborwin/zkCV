import React, { useState, useEffect } from "react"

// Components
import BentoGrid from "../components/common/Effects/BentoGrid"
import FadeIn from "../components/common/Effects/FadeIn"
import SubmitButton from "../components/common/Button/SubmitButton"
import FormField from "../components/common/Form/FormField"

// Utils
import { UI_AVATARS } from "../utils/constants"
import FileUploader from "../components/FileUploader"
import PinataUploader from "../components/UploadPinata"

// Hooks
import useIdentity from "../hooks/useIdentity"

const CVPage = () => {
    const [avatarUrl, setAvatarUrl] = useState("")
    const [file, setFile] = useState(null)

    const { identity } = useIdentity()

    const handleFileUpload = (file) => {
        setFile(file)
    }

    useEffect(() => {
        setAvatarUrl(`${UI_AVATARS}/?name=?&color=7F9CF5&background=EBF4FF`)
    }, [])

    return (
        <FadeIn>
            <BentoGrid>
                <div className="flex flex-col items-center gap-6 bg-[#0369a1] p-8 rounded-xl shadow-xl">
                    <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-40 h-40 rounded-full border-4 border-white shadow"
                    />

                    <FormField value={identity && identity.commitment.toString()}>
                        Identity
                    </FormField>

                    <FileUploader onFileUpload={handleFileUpload} />
                    {file && <PinataUploader file={file} />}
                </div>
            </BentoGrid>
        </FadeIn>
    )
}

export default CVPage
