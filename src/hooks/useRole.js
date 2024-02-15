import { useState, useEffect } from "react"
import useAccount from "./useAccount"

const roles = {
    deployer: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],
    employer: [
        "0x0a192a377E7F2Bd2ffe494cE0976b79D897E10B0",
        "0xe437260B3785171cB5BAd86c3B78d961da1b8223",
    ],
    employee: [],
}

const useRole = () => {
    const { accountDetails } = useAccount()
    const [userRole, setUserRole] = useState(null)

    useEffect(() => {
        const findUserRole = () => {
            for (const role in roles) {
                if (roles[role].includes(accountDetails.address)) {
                    return role
                }
            }
            return "employee"
        }

        const role = findUserRole()
        setUserRole(role)
    }, [accountDetails])

    // Optionally, return both account details and user role
    return userRole
}

export default useRole
