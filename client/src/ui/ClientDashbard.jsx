import React, { useEffect } from 'react'
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchClientProfileThunk } from '../features/clients/profiles/clientProfileThunk'
import { autoConnectWallet } from '../features/wallet/connectWallet'
import StartTrip from './StartTrip'
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import Trips from './Trips'

const ClientDashbard = () => {

  const dispatch = useDispatch();
  const { clientProfile } = useSelector((state) => state.client);
  const { address } = useSelector((state) => state.auth);
  console.log("clientProfile.isRegistered: ", clientProfile.isRegistered);
  useEffect(() => {
    dispatch(autoConnectWallet())
    dispatch(fetchClientProfileThunk({address}))
  }, [address])
  const isClient = clientProfile?.user?.toLowerCase() === address?.toLowerCase();
  console.log("Is Client: ", isClient)
  return (
    <div className="p-6  mx-auto min-h-screen space-y-6 bg-gray-700">

          {/* Client Info */}

          <div className=" flex items-center justify-between mx-10  ">
          <h1 className="text-3xl font-bold text-center text-green-500">Client Dashboard</h1>
              <div className="bg-white rounded-xl p-4 shadow">
                  <h2 className="text-xl font-semibold mb-2 text-start">👤 Profile</h2>
          <p className='text-start'><span>Address: </span>
            {clientProfile?.user?.slice(0, 7) || "0x..."}...{clientProfile?.user?.slice(-5) || ""}
          </p>
          <p className='text-start'><span>Status: </span>
            {clientProfile.isRegistered ? "✅ Registered as Client" : "❌ Not Registered"}
          </p>
          <p className='text-start'><span className="pr-2">Balance:</span>
           { clientProfile?.balance }ETH</p>
                  </div>
      </div>


      <div className="p-6 max-w-6xl mx-auto space-y-6">

  {/* Grouped Sections */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
        <div className="flex justify-around ">
          <div>
        <div className="flex gap-10 mb-4 text-white justify-center">
          <NavLink to="deposit">Deposit</NavLink>
          <NavLink to="withdraw">Withdraw</NavLink>
            <NavLink to="trip">Initiate Trip</NavLink>
          </div>
            <Outlet />
            </div>
          {/* Deposit Section */}
          {/* <Deposit /> */}
          {/* Withdraw Section */}
          {/* <Withdraw/> */}
          {/* Start Trip Section */}
          {/* <StartTrip /> */}
          {/* My Trips List */}
          <div className="my-10 ml-10">
            {isClient ? (<Trips />) :
              (<p
                className="text-amber-400">Not A Client. Client Trip Details Will Appear Here
              </p>)}
            </div>
          </div>


  {/* </div> */}
</div>

    </div>
  )
}

export default ClientDashbard
