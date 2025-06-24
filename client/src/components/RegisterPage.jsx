import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { autoConnectWallet, connectWallet } from '../features/wallet/connectWallet'
import { fetchRegisterClientThunk } from '../features/clients/auth/registerThunk';
// import { fetchRegisterClientThunk } from '../features/clients/deposit/depositThunk';
import Wallet from './Wallet';
import { fetchRegisterRiderThunk } from '../features/riders/auth/registerRider';
// import { connectWallet } from '../redux/wallet/walletSlice'
// import { registerClient, registerRider } from '../redux/boda/bodaThunks'

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.auth);
  const { riderId } = useSelector((state) => state.rider);
  const { clientId } = useSelector((state) => state.client);
  console.log(riderId, clientId)
  useEffect(() => {
    dispatch(autoConnectWallet());
  })

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
        <div className="mt-10">
          <h3 className="font-blod">Registeration Status: {riderId || clientId && ("Registered")}</h3>
          <h3 className="font-blod">Registered As:{ riderId &&("Rider") || clientId && ("Client")} </h3>
        </div>
      </div>
      </div>
  )
}

export default RegisterPage
