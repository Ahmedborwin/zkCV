import useAttestation from "../hooks/useAttestation";
import SemaphoreContainer from "./common/Container/Semaphore/SemaphoreContainer";
import SubmitButton from "./common/Button/SubmitButton";

const Attestation = () => {
    const {
        attestationUID,
        attestation,
        fetchAttestationUID,
        fetchAttestation,
        messages
    } = useAttestation();

    return (
        <SemaphoreContainer title="Attestation" messages={messages}>
            <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                <p className="text-gray-800">
                    <span className="text-blue-700">
                        Attestation UID: &nbsp; 
                    </span>
                    {attestationUID ? attestationUID.toString() : ""}
                </p>
                <p className="text-gray-800">
                    <span className="text-blue-700">
                        Attestation: &nbsp;
                    </span>
                    {attestation ? attestation.toString() : ""}
                </p>
            </div>

            <div className="flex justify-center m-4">
                <div className="mx-4">
                    <SubmitButton onClick={fetchAttestationUID}>
                        Submit Attestation
                    </SubmitButton>
                </div>

                <div className="mx-4">
                    <SubmitButton onClick={fetchAttestation} disabled={!attestationUID}>
                        Fetch Attestation
                    </SubmitButton>
                </div>
            </div>
        </SemaphoreContainer>
    )
}

export default Attestation;