import { NavLink } from "react-router-dom";
import Wallet from "../Wallet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { autoConnectWallet } from "@/features/wallet/connectWallet";
export const NavBar = () => {
  const { address } = useSelector((state) => state.auth);
  const { clientProfile } = useSelector((state) => state.client);
  const { riderProfile } = useSelector((state) => state.rider);

  const dispatch = useDispatch();
  const admin = import.meta.env.VITE_ADMIN_ADDRESS;
  console.log(riderProfile.user);
  const isAdmin = address?.toLowerCase() === admin?.toLowerCase();
  const isRider = address?.toLowerCase() === riderProfile?.user?.toLowerCase();
  const isClient = address?.toLowerCase() === riderProfile?.user?.toLowerCase();

  console.log(isRider);
  return (
    <div className="bg-gray-900 text-white hidden sm:flex items-center justify-between py-5 px-10">
      <div className="logo">
        <Wallet />
      </div>
      <div className="flex gap-6 text-sm">
        <NavLink to="/">Home</NavLink>
        <NavLink to="register">Register</NavLink>
        {isRider && <NavLink to="rider">Rider Dashboard</NavLink>}
        {isClient && <NavLink to="client">Client Dashboard</NavLink>}
        {isAdmin && <NavLink to="admin">Admin Dashboard</NavLink>}
        <NavLink to="available-clients">Available Customers</NavLink>
      </div>
    </div>
  );
};
