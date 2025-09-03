import { tokenAddr } from '@/config';
import { ethers } from 'ethers';

const AFB_ABI = [
  'function approve(address spender, uint256 value) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function balanceOf(address account) external view returns (uint256)',
  'function decimals() view returns (uint8)',
];

export const getTokenContract = async () => {
  if (!window.ethereum) {
    throw new Error('Metamask Not installed');
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(tokenAddr, AFB_ABI, signer);
};
