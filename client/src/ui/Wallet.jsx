import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { autoConnectWallet, connectWallet } from '../features/wallet/connectWallet';
export default function Wallet() {
    const dispatch = useDispatch();
  const { address, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(autoConnectWallet())
  }, [dispatch])
  return (
      <div>
          {!address &&(<button onClick={() => dispatch(connectWallet())}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
         >Connect Wallet</button>)}
      <div className="text-sm text-white">
        {address && (<p> Account: <span className="text-blue-400">{address.slice(0, 7)}...{address.slice(-5)}</span></p>)}
      </div>
    </div>
  )
}
