import { contractAddress } from "../config";
import contractAbi from "../utils/DecentralizedBodaDispatch.json";
import { ethers } from "ethers"
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
const getContract = async () => {
    if(!CCIPSenderAddress) throw new Error("Contract Address Unavailable")
    const signer = await getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer);
    // console.log("contract address", contract.target)

    return contract;
}
export { getProvider, getSigner, getContract }
