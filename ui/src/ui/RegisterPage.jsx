import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { autoConnectWallet, connectWallet } from "../features/wallet/connectWallet";
import { fetchRegisterClientThunk } from "../features/clients/auth/registerThunk";
import Wallet from "./Wallet";
import { fetchRegisterRiderThunk } from "../features/riders/auth/registerRider";
import { fetchClientProfileThunk } from "../features/clients/profiles/clientProfileThunk";
import { fetchRiderProfileThunk } from "@/features/riders/profiles/riderProfileThunk";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { bodaContractConfig } from "@/contract/wagmiContractConfig";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const RegisterPage = () => {
  // const dispatch = useDispatch();
  // const { address } = useSelector((state) => state.auth);
  // const { riderProfile } = useSelector((state) => state.rider);
  // const { clientProfile } = useSelector((state) => state.client);
  // console.log(clientProfile?.isRegistered);

  // First: connect wallet once
  // useEffect(() => {
  //   dispatch(autoConnectWallet());
  // }, []);

  // Then: only fetch profile *after* address is loaded
  // useEffect(() => {
  //   if (address) {
  //     dispatch(fetchClientProfileThunk({ address }));
  //     dispatch(fetchRiderProfileThunk({ address }));
  //     dispatch(fetchClientProfileThunk({ address }));
  //   }
  // }, [address]);
  const { address } = useAccount();
  // const [riderProfile, setRiderProfile]=useState(null)
  // const [clientProfile, setClientProfile]=useState(null)

  // const getDetails = () => {
  // console.log(who);

  const {
    data: riderProfile,
    error: riderError,
    isPending: riderPending,
  } = useReadContract({
    ...bodaContractConfig,
    functionName: "getRiderInfo",
    args: [address],
  });

  const {
    data: clientProfile,
    error: clientError,
    isPending: clientPending,
  } = useReadContract({
    ...bodaContractConfig,
    functionName: "getClientInfo",
    args: [address],
  });
  const { writeContractAsync, pending: isPending } = useWriteContract();

  const registerRiders = async (who) => {
    try {
      if (who === "rider") {
        const tx = await writeContractAsync({
          ...bodaContractConfig,
          functionName: "registerRider",
          args: [],
        });
        await tx.wait();
      } else if (who === "client") {
        const tx = await writeContractAsync({
          ...bodaContractConfig,
          functionName: "registerClient",
          args: [],
        });
        await tx.wait();
      }
    } catch (error) {}
  };
  // };
  // useEffect(() => {
  //   getDetails();
  // }, [address]);
  console.log("riderProfile: ", riderProfile);

  return (
    <div className="min-h-screen">
      <div className="min-h-screen p-4  flex flex-col items-center gap-8">
        <h1 className="text-lg sm:text-3xl font-bold text-gray-200 mt-4">Register</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Client Card */}
          <div className="bg-gray-100/30 backdrop-blur-md border border-gray-200/40 shadow-md rounded-md p-6 text-white">
            <h2 className="text-xl font-semibold mb-4">Register as Client</h2>
            {!address && (
              // <button
              //   onClick={() => dispatch(connectWallet())}
              //   className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 mb-3"
              // >
              //   Connect Wallet
              // </button>
              <ConnectButton />
            )}
            <button
              onClick={() => registerRiders("client")}
              className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700"
            >
              Register as Client
            </button>
          </div>

          {/* Rider Card */}
          <div className="bg-gray-100/30 backdrop-blur-md border border-gray-200/40 shadow-md rounded-md p-6 text-white">
            <h2 className="text-xl font-semibold mb-4">Register as Rider</h2>
            {!address && (
              // <button
              //   onClick={() => dispatch(connectWallet())}
              //   className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 mb-3"
              // >
              //   Connect Wallet
              // </button>
              <ConnectButton />
            )}
            <button
              onClick={() => registerRiders("rider")}
              className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700"
            >
              Register as Rider
            </button>
          </div>
        </div>
        <div className="mt-10 bg-amber-300 p-2 rounded-lg">
          <h3 className="font-blod">
            <span className="pr-2">Registeration Status:</span>
            {clientProfile?.isRegistered ? "Registered" : riderProfile?.isRegistered ? "Registered" : "Not Registered"}
          </h3>
          {clientProfile?.isRegistered ||
            (riderProfile?.isRegistered && (
              <h3 className="font-blod">
                <span className="pr-2">Registered As:</span>
                {(clientProfile?.isRegistered && "Client") || (riderProfile?.isRegistered && "Rider")}
              </h3>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
