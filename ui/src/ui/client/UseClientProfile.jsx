import { useBodaBlocks } from "@/contract/contractConnect";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const UseClientProfile = (address) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const contract = useBodaBlocks();
  useEffect(() => {
    if (!address || !contract) return;
    setLoading(true);
    (async () => {
      try {
        const clientInfo = await contract.getClientInfo(address);
        console.log("contract function");
        const clientProfile = {
          balance: ethers.formatEther(clientInfo[0]),
          user: clientInfo[1],
          clientId: clientInfo[2].toString(),
          isRegistered: clientInfo[3],
          hasSomeBalance: clientInfo[4],
        };
        console.log("data here ======> ", clientProfile);
        setProfile(clientProfile);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.log("Error ====>", err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [address, contract]);
  return { profile, loading, error };
};
