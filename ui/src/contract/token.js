import { tokenAddr } from '@/config';
import { ethers } from 'ethers';

const AFB_ABI = [
  'function approve(address spender, uint256 value) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function balanceOf(address account) external view returns (uint256)',
  'function decimals() view returns (uint8)',
];

const getProvider = () => {
    if (window.ethereum) {
        return new ethers.BrowserProvider(window.ethereum);
    } else {
        throw new Error("Metamask Not installed")
    }
}
const getSigner = async () => {
    const provider = getProvider();
    await provider.send("eth_requestAccounts", []);
    return await provider.getSigner()
}
export const getTokenContract = async () => {
    const signer = await getSigner();
    const contract = new ethers.Contract(tokenAddr, AFB_ABI.abi, signer);
    console.log("contract");
    return contract

};
