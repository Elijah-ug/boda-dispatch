import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./ui/Home";
import NavBar from "./ui/navigation/NavBar";
import RiderDashboard from "./ui/RiderDashboard";
import ClientDashbard from "./ui/ClientDashbard";
import RegisterPage from "./ui/RegisterPage";
import Deposit from "./ui/Deposit";
import Withdraw from "./ui/Withdraw";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { autoConnectWallet } from "./features/wallet/connectWallet";
import Footer from "./ui/Footer";
import AdminDashboard from "./ui/admin/AdminDashboard";
import InitiateTrip from "./ui/InitiateTrip";
import { AvailableClients } from "./ui/AvailableClients";
import { Foot } from "./ui/Foot";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!window.ethereum) return;
    const handleAccountsChanged = async (accounts) => {
      console.log("Changed to:", accounts);
      if (accounts.length > 0) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          dispatch(autoConnectWallet());
          toast.success("Account Changed");
        } catch (error) {
          toast.error("Failed to connect new account");
          console.error(error.message);
        }
      } else {
        toast.error("Wallet Disconnected");
        console.log("An error occurred");
      }
    };
    // accounts changed event
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    //clean up the event
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  return (
    <div className="">
      <div className="">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="rider" element={<RiderDashboard />} />
          <Route path="client" element={<ClientDashbard />}>
            <Route path="deposit" element={<Deposit />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="trip" element={<InitiateTrip />} />
          </Route>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="available-clients" element={<AvailableClients />} />
        </Routes>
      </div>

      {/* <ToastContainer position="top-right" /> */}
      <Footer />
      {/* <Foot /> */}
    </div>
  );
}
