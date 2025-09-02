import React, { useState } from 'react'
import { fetchClinetWithdrawThunk } from '../features/clients/withdraw/clientWithdrawThunk';
import { ethers } from 'ethers';
import { useDispatch } from 'react-redux';

export default function Withdraw() {
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const dispatch = useDispatch();

    const handleWithdraw = () => {

        if (parseFloat(withdrawAmount) < 0 || isNaN(withdrawAmount)) {
            alert("Invalid Amount");
            return;
          }
        dispatch(fetchClinetWithdrawThunk({ amount: ethers.parseEther(withdrawAmount) }));
      }
  return (
      <div>
          <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">💸 Withdraw Funds</h2>
      <input
        type="number"
        placeholder="Amount to withdraw"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
            <button onClick={handleWithdraw}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 w-full">
        Withdraw
      </button>
    </div>
    </div>
  )
}
