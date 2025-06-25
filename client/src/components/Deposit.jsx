import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchClientDepositThunk } from '../features/clients/deposit/depositThunk';
import { ethers } from 'ethers';

export default function Deposit() {
    const [depositAmount, setDepositAmount] = useState('');
    const dispatch = useDispatch();
    const handleDeposit = () => {

        if (parseFloat(depositAmount) < 0 || isNaN(depositAmount)) {
          alert("Invalid Amount");
          return;
        }
        dispatch(fetchClientDepositThunk({ amount: ethers.parseEther(depositAmount) }));
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
