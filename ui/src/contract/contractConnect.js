import { contractAddress } from "@/config";
import { ethers } from "ethers";
import { usePublicClient, useWalletClient } from "wagmi";
import contractAbi from "../utils/BodaBlocks.json";

export const useBodaBlocks = () => {
  const { data: walletClient } = useWalletClient(); //signer client
  const publicClient = usePublicClient(); //read-only client
  console.log("useWalletClient ", useWalletClient());
  if (!contractAddress) throw new Error("Contract Address Unavailable");
  // signer available only if wallet is connected
  const signer = walletClient ? new ethers.BrowserProvider(walletClient.transport).getSigner() : null;
  const contract = signer
    ? new ethers.Contract(contractAddress, contractAbi.abi, signer)
    : new ethers.Contract(contractAddress, contractAbi.abi, publicClient);
  console.log("Contract address ==> ", contract);
  return contract;
};
