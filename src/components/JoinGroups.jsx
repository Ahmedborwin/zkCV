import React, { useState, useCallback, useEffect } from "react";

// Components
import SubmitButton from "./common/Button/SubmitButton";
import SemaphoreContainer from "./common/Container/Semaphore/SemaphoreContainer";

// Semaphore
import { Identity } from "@semaphore-protocol/identity";

// Hooks
import useSemaphore from "../hooks/useSemaphore";
import useGroupJoin from "../hooks/useGroupJoin";

const JoinGroups = () => {
    const { users, refreshUsers } = useSemaphore();

    const userHasJoined = useCallback((identity) => {
        return users.includes(identity.commitment.toString());
    }, [users])

    const { identity, messages, loading, joinGroup, setMessages } = useGroupJoin();

    useEffect(() => {
        if (users.length > 0) {
            setMessages(`${users.length} user${users.length > 1 ? "s" : ""} retrieved from the group 🤙🏽`);
        }
    }, [users])

    return (
        <SemaphoreContainer
            title={"Groups"}
            subTitle={`Feedback users (${users.length})`}
            messages={messages}
        >
            <div className="flex justify-center m-4">
                <div className="mx-4">
                    <SubmitButton onClick={refreshUsers}>
                        Refresh
                    </SubmitButton>
                </div>

                <div className="mx-4">
                    <SubmitButton onClick={joinGroup} disabled={loading || !identity || userHasJoined(identity)}>
                        Join Group
                    </SubmitButton>
                </div>
            </div>

            {users.length > 0 && (
                <div>
                    {users.map((user, i) => (
                        <div key={i} >
                            <p>{user}</p>
                        </div>
                    ))}
                </div>
            )}
        </SemaphoreContainer>
    )
}

export default JoinGroups;