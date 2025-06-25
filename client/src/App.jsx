import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import NavBar from './components/navigation/NavBar'
import RiderDashboard from './components/RiderDashboard'
import ClientDashbard from './components/ClientDashbard'
import RegisterPage from './components/RegisterPage'
import Deposit from './components/Deposit'
import Withdraw from './components/Withdraw'
import StartTrip from './components/StartTrip'
import { toast, ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { autoConnectWallet } from './features/wallet/connectWallet'

export default function App() {
const dispatch = useDispatch()
  useEffect(() => {
    if (!window.ethereum) return
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
        console.log("An error occurred")
      }
    }
    // accounts changed event
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    //clean up the event
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    }
  }, [])

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={ <RegisterPage/>} />
        <Route path="rider" element={<RiderDashboard />} />
        <Route path="client" element={<ClientDashbard />} >
          <Route path="deposit" element={<Deposit />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="trip" element={<StartTrip/>}/>
        </Route>
      </Routes>

      <ToastContainer position="top-right" />
    </div>
  )
}
