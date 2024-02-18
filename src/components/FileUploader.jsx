import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"

const FileUploader = ({ onFileUpload }) => {
    const onDrop = useCallback(
        (acceptedFiles) => {
            // Assuming only one file is uploaded
            const file = acceptedFiles[0]
            onFileUpload(file)
        },
        [onFileUpload]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div
            {...getRootProps()}
            style={{ border: "2px dashed #007bff", padding: "20px", cursor: "pointer" }}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag 'n' drop CV here, or click to select file</p>
            )}
        </div>
    )
}

export default FileUploader
