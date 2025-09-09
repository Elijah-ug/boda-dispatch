import { fetchRiderProfileThunk } from "@/features/riders/profiles/riderProfileThunk";
import { autoConnectWallet } from "@/features/wallet/connectWallet";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const CreateRider = () => {
  const dispatch = useDispatch();
  const { riderProfile } = useSelector((state) => state.rider);
  const { address } = useSelector((state) => state.auth);
  const { earnings, user, riderId, completedTrips, totalTrips, isRegistered } = riderProfile;

  console.log("dataaaaaa=>", earnings, user);
  const fetchriderUrl = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_RIDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(riderProfile),
      });
      console.log("riderProfile ", riderProfile);
      if (!res.ok) {
        throw new Error(`An error occured:  ${res}`);
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
  }, [address]);
  useEffect(() => {
    if (riderProfile && riderProfile.isRegistered) {
      fetchriderUrl();
    }
  }, [riderProfile]);

  console.log("riderProfile.isRegistered", riderProfile.isRegistered, riderProfile);
  return <div>CreateRider</div>;
};
