import React from 'react'

export default function Trips() {
    const trips = [] // placeholder until Redux
  return (
      <div>
          <div className="bg-white p-4 rounded-xl shadow col-span-1 md:col-span-2">
      <h2 className="text-xl font-semibold mb-2">📦 My Trips</h2>
              {trips.length === 0 ? (
                  <div className="w-50">
                      <p className="text-gray-500">No trips yet.</p>
                      </div>
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
    </div>
  )
}
