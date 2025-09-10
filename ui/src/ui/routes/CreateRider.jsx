import { fetchRiderProfileThunk } from "@/features/riders/profiles/riderProfileThunk";
import { autoConnectWallet } from "@/features/wallet/connectWallet";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const CreateRider = () => {
  const dispatch = useDispatch();
  const { riderProfile } = useSelector((state) => state.rider);
  const { address } = useSelector((state) => state.auth);

  const fetchriderUrl = async () => {
    if (!riderProfile.isRegistered) {
      throw new Error("Unregistered rider");
      return;
    }
    try {
      const res = await fetch(import.meta.env.VITE_RIDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(riderProfile),
      });
      if (!res.ok) {
        throw new Error("An error occured: ", res.status);
      }
      console.log("Created ", riderProfile);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    dispatch(autoConnectWallet());
    dispatch(fetchRiderProfileThunk({ address }));
    fetchriderUrl();
  }, [address]);

  console.log(address);
  return <div>CreateRider</div>;
};
