import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./ui/Home";
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
import { MobileNavBar } from "./ui/navigation/MobileNavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavBar } from "./ui/navigation/NavBar";
import { wagmiConfig } from "./wagmiConfig";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";

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

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {" "}
        <RainbowKitProvider>
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
              <NavBar />
              <MobileNavBar />
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
        </RainbowKitProvider>{" "}
      </QueryClientProvider>{" "}
    </WagmiProvider>
  );
}
