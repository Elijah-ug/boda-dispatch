import { fetchClientProfileThunk } from "@/features/clients/profiles/clientProfileThunk";
import { autoConnectWallet } from "@/features/wallet/connectWallet";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const CreateClient = () => {
  const { clientProfile } = useSelector((state) => state.client);
  const { address } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(autoConnectWallet());
    dispatch(fetchClientProfileThunk({ address }));
  }, [address]);
  console.log(clientProfile);
  const fetchClientEndPoint = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_CLIENT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientProfile),
      });
      if (!res.ok) {
        throw new Error(`An error occured:  ${res}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return console.log(error.message);
    }
  };
  useEffect(() => {
    if (clientProfile && clientProfile.isRegistered) {
      fetchClientEndPoint();
    }
  }, [clientProfile]);
  return <div>CreateClient</div>;
};
