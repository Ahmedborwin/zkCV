import { useState, useEffect } from 'react';
import useAccount from './useAccount';

const roles = {
    deployer: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
    employer: [
        '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        '0xBcd4042DE499D14e55001CcbB24a551F3b954096',
    ],
    employee: [],
};

const useRole = () => {
    const { accountDetails } = useAccount();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const findUserRole = () => {
            for (const role in roles) {
                if (roles[role].includes(accountDetails.address)) {
                    return role;
                }
            }
            return 'employee';
        };

        const role = findUserRole();
        setUserRole(role);
    }, [accountDetails]);

    // Optionally, return both account details and user role
    return userRole;
};

export default useRole;
