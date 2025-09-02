import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientDepositThunk } from '../features/clients/deposit/depositThunk';
import { ethers, parseEther } from 'ethers';
import { fetchClientProfileThunk } from '../features/clients/profiles/clientProfileThunk';

export default function Deposit() {
    const [depositAmount, setDepositAmount] = useState('');
  const dispatch = useDispatch();
    const { clientProfile } = useSelector((state) => state.client);
    const { address } = useSelector((state) => state.auth);
    const handleDeposit = () => {

        if (parseFloat(depositAmount) < 0 || isNaN(depositAmount)) {
          alert("Invalid Amount");
          return;
        }
      dispatch(fetchClientDepositThunk({ amount: parseEther(depositAmount.toString()) }));
      dispatch(fetchClientProfileThunk({address}))
      console.log("depositAmount: ", depositAmount)
      console.log("Type of depositAmount: ", typeof (depositAmount))
      setDepositAmount("");
      }
  return (
      <div>
          <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-2">💰 Deposit Funds</h2>
                <input
                  type="number"
                  placeholder="Amount in ETH"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="border p-2 rounded w-full mb-2"
                />
                      <button onClick={handleDeposit}
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
                  Deposit
                </button>
              </div>
    </div>
  )
}
