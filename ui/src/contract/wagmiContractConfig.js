import { contractAddress, tokenAddr } from "../config";
import contractAbi from "../utils/BodaBlocks.json";
import { AFB_ABI } from "./token";

export const bodaContractConfig = { address: contractAddress, abi: contractAbi.abi };

export const tokenContractConfig = {address: tokenAddr, abi: AFB_ABI}