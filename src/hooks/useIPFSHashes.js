import { useState, useEffect } from "react";
import BN from "bn.js";
import { Buffer } from "buffer";

export const useIPFSHashes = (verifiedProofs) => {
    const [ipfsContentList, setIpfsContentList] = useState([]);

    useEffect(() => {
        const fetchIPFSHashes = async () => {
            if (!verifiedProofs || verifiedProofs.length === 0) return;
            const bs58 = await import("bs58");
            const hashList = verifiedProofs.map(proof => {
                const signalBInt = new BN(proof.signal, 10);
                const bytes32Buffer = signalBInt.toArrayLike(Buffer, "be", 32);
                const multihashPrefix = Buffer.from([0x12, 0x20]);
                const fullBuffer = Buffer.concat([multihashPrefix, bytes32Buffer]);
                return `https://cf-ipfs.com/ipfs/${bs58.encode(fullBuffer)}`;
            });
            setIpfsContentList(hashList);
        };
        fetchIPFSHashes();
    }, [verifiedProofs]);

    return ipfsContentList;
};
