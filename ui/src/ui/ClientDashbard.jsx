import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientProfileThunk } from "../features/clients/profiles/clientProfileThunk";
import { autoConnectWallet } from "../features/wallet/connectWallet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Trips from "./Trips";
import { ClientAccess } from "./client/ClientAccess";

const ClientDashbard = () => {
  const dispatch = useDispatch();
  const { clientProfile } = useSelector((state) => state.client);
  const { address } = useSelector((state) => state.auth);
  console.log("clientProfile.isRegistered: ", clientProfile);
  useEffect(() => {
    dispatch(autoConnectWallet());
    dispatch(fetchClientProfileThunk({ address }));
  }, [address]);
  const isClient = clientProfile?.user?.toLowerCase() === address?.toLowerCase();
  console.log("Is Client: ", isClient);
  return (
    <div className="p-6  mx-auto min-h-screen space-y-6 ">
      {/* Client Info */}

      <div className=" flex sm:flex-row flex-col items-center justify-between gap-5  ">
        <h1 className="text-3xl font-bold text-center text-green-500">Client Dashboard</h1>

        <Card className="w-full max-w-lg bg-gray-100/40 text-white">
          <CardHeader>
            <CardTitle>👤 Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="">
              <p className="text-start">
                <span>Address: </span>
                {clientProfile?.user?.slice(0, 7) || "0x..."}...{clientProfile?.user?.slice(-5) || ""}
              </p>
              <p className="text-start">
                <span>Status: </span>
                {clientProfile.isRegistered ? "✅ Registered as Client" : "❌ Not Registered"}
              </p>
              <p className="text-start">
                <span className="pr-2">Balance:</span>
                {`${clientProfile?.balance} AFB`}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className=" max-w-6xl mx-auto space-y-6">
      
        <div className="flex flex-col mt-15 sm:flex-row gap-5 items-center justify-around ">
          
          <ClientAccess />
          <div className="">
            {isClient ? (
              <Trips />
            ) : (
              <p className="text-amber-400">Not A Client. Client Trip Details Will Appear Here</p>
            )}
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ClientDashbard;
