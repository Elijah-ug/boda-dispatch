import { NavLink } from "react-router-dom";
import Wallet from "../Wallet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { autoConnectWallet } from "@/features/wallet/connectWallet";
export default function NavBar() {
  const { address } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const admin = import.meta.env.VITE_ADMIN_ADDRESS;
  console.log(address, admin);
  const isEqual = address?.toLowerCase() === admin?.toLowerCase();
  console.log(isEqual);
  return (
    <div className="bg-gray-900 text-white hidden sm:flex items-center justify-between py-5 px-10">
      <div className="logo">
        <Wallet />
      </div>
      <div className="flex gap-6 text-sm">
        <NavLink to="/">Home</NavLink>
        <NavLink to="register">Register</NavLink>
        <NavLink to="rider">Rider Dashboard</NavLink>
        <NavLink to="client">Client Dashboard</NavLink>
        <NavLink to="admin">Admin Dashboard</NavLink>
        <NavLink to="available-clients">Available Customers</NavLink>
      </div>
    </div>
  );
}
