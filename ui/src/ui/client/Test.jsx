import { useWalletClient, usePublicClient, useAccount } from "wagmi";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { contractAddress } from "@/config";
import contractAbi from "../../utils/BodaBlocks.json";

export const useClientProfileTest = () => {
  const { address, isConnected } = useAccount();
  const { data: walletClient, isError: walletError, isLoading: walletLoading } = useWalletClient();
  const publicClient = usePublicClient();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!address || !isConnected) return;

    // Decide provider: signer if wallet connected, else read-only
    let contract;
    if (walletClient) {
      const provider = new ethers.BrowserProvider(walletClient.transport);
      const signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractAbi.abi, signer);
    } else if (publicClient) {
      contract = new ethers.Contract(contractAddress, contractAbi.abi, publicClient);
    } else {
      return; // neither ready
    }

    setLoading(true);
    (async () => {
      try {
        const clientInfo = await contract.getClientInfo(address);
        const clientProfile = {
          balance: ethers.formatEther(clientInfo[0]),
          user: clientInfo[1],
          clientId: clientInfo[2].toString(),
          isRegistered: clientInfo[3],
          hasSomeBalance: clientInfo[4],
        };
        setProfile(clientProfile);
        setError(null);
        console.log("Fetched profile =====> ", clientProfile);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [address, isConnected, walletClient, publicClient]);

  return { profile, loading, error };
};
