import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStartTripThunk } from '../features/clients/trip/start/startTripThunk';
import { parseEther } from 'ethers';
import { fetchCurrentTripId } from '../features/clients/trip/tripData/currentTripIdThunk';

export default function StartTrip() {
    const [riderAddress, setRiderAddress] = useState('')
  const [tripFare, setTripFare] = useState('');
  const { tripInfo } = useSelector((state) => state.trips)
  // console.log("tripInfo: ", tripInfo.rider);
    const dispatch = useDispatch();
    const handleStartTrip = () => {
       const parsedWei = parseEther(tripFare || "0");
      dispatch(fetchStartTripThunk({ rider: riderAddress, fare: parsedWei.toString() }));
    }

  return (
    <div>
      {/* <button onClick={() => dispatch(fetchCurrentTripId())}
        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
        Get Trip Id
      </button> */}
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
