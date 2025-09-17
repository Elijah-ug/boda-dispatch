import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { autoConnectWallet, connectWallet } from "../features/wallet/connectWallet";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
export default function Wallet() {
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState("");
  const { address, isConnected } = useAccount();
  // const { address, loading } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(autoConnectWallet());
  // }, [dispatch]);
  const handleCopyAddress = (companyAddress) => {
    setCopiedAddress(companyAddress);
    navigator.clipboard.writeText(companyAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div>
      <ConnectButton />
      {/* {isConnected ? (
        <div onClick={() => handleCopyAddress(address)} className="flex items-center gap-1 text-sm cursor-pointer">
          {address.slice(0, 7)}...{address.slice(-5)}
          {copiedAddress === address && copied ? (
            <div className="flex items-center gap-1">
              <FaCheck className="text-green-400 text-sm font-extralight" />
              <span className="text-xs">copied</span>
            </div>
          ) : (
            <IoCopyOutline />
          )}
        </div>
      ) : (
        <div>
          <ConnectButton />
        </div>
      )} */}
      {/* {!address && (
        <button
          onClick={() => dispatch(connectWallet())}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
        >
          Connect Wallet
        </button>
      )}
      <div className="text-sm text-white">
        {address && (
          <p>
            {" "}
            Account:{" "}
            <span className="text-blue-400">
              {address.slice(0, 7)}...{address.slice(-5)}
            </span>
          </p>
        )}
      </div> */}
    </div>
  );
}
