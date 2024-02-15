import React, { useEffect, useState } from "react"
import { ethers } from "ethers"

// Semaphore
import useIdentity from "../hooks/useIdentity"
import { Group } from "@semaphore-protocol/group"

// Components
import SubmitButton from "./common/Button/SubmitButton"
import FormField from "./common/Form/FormField"
import FormBox from "./common/Form/FormBox"

//Contracts
import zkCV_ABI from "../config/zkCV_ABI.json"
import zkCV_AddressList from "../config/zkCV_address.json"
import Sempahore_AddressList from "../config/semaphore_address.json"
import Semaphore_ABI from "../config/semaphore_ABI.json"

//hooks
import useAccount from "../hooks/useAccount"
import { useContractWrite, usePrepareContractWrite, useContractRead } from "wagmi"

const CreateJobAdd = (jobAddCount = 0) => {
    const [editMode, setEditMode] = useState(false)
    const [position, setPosition] = useState(null)
    const [experience, setExperience] = useState(null)
    const [skills, setSkills] = useState(null)
    const [createGroupReady, setCreateGroupReady] = useState(false)
    const [prepareCreateGroupReady, setPrepareCreateGroupReady] = useState(false)

    const { accountDetails, chain } = useAccount()
    const { identity } = useIdentity()

    const address = accountDetails.address

    //write to Token contract and NFT contract
    const { config: prepareCreateGroup } = usePrepareContractWrite({
        address: zkCV_AddressList[chain.id],
        abi: zkCV_ABI,
        functionName: "createGroup",
        args: [1],
        enabled: prepareCreateGroupReady,
        onSettled(data, error) {
            if (data) {
                console.log("prepareGroupCreate", data)
                setCreateGroupReady(true)
                setPrepareCreateGroupReady(false)
            } else if (error) {
                console.log("prepareGroupCreate", error)
                setPrepareCreateGroupReady(false)
            }
        },
    })
    // approve
    const { writeAsync: createGroup } = useContractWrite(prepareCreateGroup)

    const handlePostJobAdd = async () => {
        // // create group
        // const newId = ethers.toBigInt(`1`)
        // const newJobAdd = new Group(newId, 20)
        // newJobAdd.addMember(identity.commitment)
        // // save group
        // console.log(newJobAdd, "@@@@newJobAdd")
        // // post job add

        // setPrepareCreateGroupReady(true)
        setEditMode(false)
        const provider = new ethers.AlchemyProvider("matic-mumbai", process.env.ALCHEMY_API_KEY)
        const privateKey = process.env.REACT_APP_PRIVATE_KEY // fetch PRIVATE_KEY
        console.log(privateKey)
        const wallet = new ethers.Wallet(
            "0xbf0c60264942544c1ecb566e558207f5d84d08bd66d524bbc7df9b92b9d6f946"
        )
        const signer = wallet.connect(provider)
        const zeroKnowledgeCV = new ethers.BaseContract(
            zkCV_AddressList[chain.id],
            zkCV_ABI,
            signer
        )
        const tx = await zeroKnowledgeCV.createGroup(1)
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
