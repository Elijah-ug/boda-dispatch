import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { autoConnectWallet, connectWallet } from '../features/wallet/connectWallet'
import { fetchRegisterClientThunk } from '../features/clients/auth/registerThunk';
import Wallet from './Wallet';
import { fetchRegisterRiderThunk } from '../features/riders/auth/registerRider';
import { fetchClientProfileThunk } from '../features/clients/profiles/clientProfileThunk';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.auth);
  const {  riderProfile } = useSelector((state) => state.rider);
  const { clientProfile } = useSelector((state) => state.client);
  console.log( clientProfile?.isRegistered)

  // First: connect wallet once
useEffect(() => {
  dispatch(autoConnectWallet());
}, []);

// Then: only fetch profile *after* address is loaded
useEffect(() => {
  if (address) {
    dispatch(fetchClientProfileThunk({ address }));
  }
}, [address]);
console.log("isRegistered: ", clientProfile?.isRegistered)


  return (
    <div className="bg-gray-700">
      <div className="text-end mr-10 pt-4">
                  <Wallet/>
                </div>
    <div className="min-h-screen p-4  flex flex-col items-center gap-8">

      <h1 className="text-3xl font-bold mt-4">Register</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

        {/* Client Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-xl font-semibold mb-4">Register as Client</h2>
          {!address && (<button
            onClick={() => dispatch(connectWallet())}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 mb-3"
          >
            Connect Wallet
          </button>)}
          <button
            onClick={() => dispatch(fetchRegisterClientThunk())}
            className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700"
          >
            Register as Client
          </button>
        </div>

        {/* Rider Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Register as Rider</h2>
          {!address && (<button
            onClick={() => dispatch(connectWallet())}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 mb-3"
          >
            Connect Wallet
          </button>)}
          <button
            onClick={() => dispatch(fetchRegisterRiderThunk())}
            className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700"
          >
            Register as Rider
          </button>
        </div>

        </div>
        <div className="mt-10 bg-amber-300 p-2 rounded-lg">
          <h3 className="font-blod"><span className="pr-2">Registeration Status:</span>
            {clientProfile?.isRegistered ? ("Registered") : riderProfile?.isRegistered ? ("Registered") : ("Not Registered")}
          </h3>
          <h3 className="font-blod"><span className="pr-2">Registered As:</span>
            {clientProfile?.isRegistered && ("Client") || riderProfile?.isRegistered && ("Rider")}
          </h3>
        </div>
      </div>
      </div>
  )
}

export default RegisterPage
