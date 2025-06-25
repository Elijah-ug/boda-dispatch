import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchStartTripThunk } from '../features/clients/trip/start/startTripThunk';
import { parseEther } from 'ethers';

export default function StartTrip() {
    const [riderAddress, setRiderAddress] = useState('')
    const [tripFare, setTripFare] = useState('');
    const dispatch = useDispatch();
    const handleStartTrip = () => {
        parsedWei = parseEther(tripFare || "0");
        dispatch(fetchStartTripThunk({rider: riderAddress, fare: parseFloat(parsedWei)}))
    }
  return (
      <div>
          <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">🛵 Start Trip</h2>
      <input
        type="text"
        placeholder="Rider Address"
        value={riderAddress}
        onChange={(e) => setRiderAddress(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="number"
        placeholder="Fare in ETH"
        value={tripFare}
        onChange={(e) => setTripFare(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
        <button onClick={handleStartTrip}
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full">
        Start Trip
      </button>
    </div>
    </div>
  )
}
