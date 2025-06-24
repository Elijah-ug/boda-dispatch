import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStartTripThunk } from '../features/clients/trip/start/startTripThunk'

const ClientDashbard = () => {
  const [depositAmount, setDepositAmount] = useState('')
  const [riderAddress, setRiderAddress] = useState('')
  const [tripFare, setTripFare] = useState('')
    const [withdrawAmount, setWithdrawAmount] = useState('')

  const dispatch = useDispatch();
  const { balance, hasSomeBalance, isRegistered, user } = useSelector((state) => state.client);
  console.log("user: ", user);
    const handleStartTrip = () => {
        // if()
        // if(!riderAddress && !tripFare && )
    }
  const trips = [] // placeholder until Redux

  return (
    <div className="p-6  mx-auto space-y-6 bg-gray-700">

          {/* Client Info */}

          <div className=" flex items-center justify-between mx-10  ">
          <h1 className="text-3xl font-bold text-center text-green-500">Client Dashboard</h1>
              <div className="bg-white rounded-xl p-4 shadow">
                  <h2 className="text-xl font-semibold mb-2 text-start">👤 Profile</h2>
                  <p className='text-start'>Address: 0xYourAddressHere</p>
                  <p className='text-start'>Status: ✅ Registered as Client</p>
                  <p className='text-start'>Balance: 0.42 ETH</p>
                  </div>
      </div>


      <div className="p-6 max-w-6xl mx-auto space-y-6">

  {/* Grouped Sections */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Deposit Section */}
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">💰 Deposit Funds</h2>
      <input
        type="number"
        placeholder="Amount in ETH"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
        Deposit
      </button>
    </div>

    {/* Start Trip Section */}
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

    {/* My Trips List */}
    <div className="bg-white p-4 rounded-xl shadow col-span-1 md:col-span-2">
      <h2 className="text-xl font-semibold mb-2">📦 My Trips</h2>
      {trips.length === 0 ? (
        <p className="text-gray-500">No trips yet.</p>
      ) : (
        trips.map((trip, i) => (
          <div
            key={i}
            className="border-b py-2 flex justify-between items-center"
          >
            <div>
              <p>Trip #{trip.tripId}</p>
              <p>Rider: {trip.rider}</p>
              <p>Fare: {trip.fare} ETH</p>
            </div>
            {!trip.isCompleted && (
              <button className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">
                Complete Trip
              </button>
            )}
          </div>
        ))
      )}
    </div>

    {/* Withdraw Section */}
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">💸 Withdraw Funds</h2>
      <input
        type="number"
        placeholder="Amount to withdraw"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 w-full">
        Withdraw
      </button>
    </div>
  </div>
</div>

    </div>
  )
}

export default ClientDashbard
