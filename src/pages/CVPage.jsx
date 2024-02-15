import React, { useState, useEffect } from "react"

// Components
import BentoGrid from "../components/common/Effects/BentoGrid"
import FadeIn from "../components/common/Effects/FadeIn"
import SubmitButton from "../components/common/Button/SubmitButton"
import FormField from "../components/common/Form/FormField"

// Utils
import { UI_AVATARS } from "../utils/constants"
import FormFile from "../components/common/Form/FormFile"
import FileUploader from "../components/FileUploader"
import PinataUploader from "../components/UploadPinata"

const CVPage = () => {
    const [name, setName] = useState("John Doe")
    const [avatarUrl, setAvatarUrl] = useState("")
    const [file, setFile] = useState(null)

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

                    <FormField value={name} onChange={(e) => setName(e.target.value)}>
                        Identity
                    </FormField>

                    {/* <FormFile onChange={(e) => setFile(e.target.files[0])}>Upload File</FormFile> */}

                    <FileUploader onFileUpload={handleFileUpload} />
                    {file && <PinataUploader file={file} />}
                </div>
            </BentoGrid>
        </FadeIn>
    )
}

export default CVPage
