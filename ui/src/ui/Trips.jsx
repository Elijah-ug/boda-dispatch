import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentTripId } from '../features/clients/trip/tripData/currentTripIdThunk';
import { fetchTripThunk } from '../features/clients/trip/tripData/tripThunk';
import { fetchCompleteTripThunk } from '../features/clients/trip/complete/completeTrip';
import { toast } from 'react-toastify';

export default function Trips() {
  const dispatch = useDispatch();
  const { tripInfo } = useSelector((state) => state.trips)
  const {address} = useSelector((state) => state.auth)
  useEffect(() => {
    dispatch(fetchCurrentTripId())
      .unwrap()
      .then(tripId => {
        console.log('Trip Id =>', tripId);
        dispatch(fetchTripThunk({ tripId }));
      })
      .catch(error => {
        toast.error('Falied to load trip: ' + error.message);
      });
  }, []);

  const handleCompleteTrip = async () => {
    try {
      if (tripInfo?.client?.toLowerCase() !== address?.toLowerCase()) {
        console.log('You are not authorized to complete this trip');
        return;
      }
      const tripId = await dispatch(fetchCurrentTripId()).unwrap();
      await dispatch(fetchCompleteTripThunk({ tripId })).unwrap();
    } catch (error) {
      console.log('Failed to complete the trip: ', error.message);
    }
  };
  //   console.log('trip info rider: ', tripInfo);
  console.log('Type of tripInfo.tripId: ', typeof tripInfo.tripId);
  const trips = [];
  return (
    <div>
      <div className="bg-gray-700 text-white p-4 rounded-xl shadow col-span-1 md:col-span-2">
        <h2 className="text-xl font-semibold mb-2">📦 Recent Trip Details</h2>
        {tripInfo ? (
          <div className="border-b py-2 flex justify-between items-center gap-4">
            <div>
              <p>Trip #{tripInfo?.tripId ? Number(tripInfo?.tripId) + 1 : null}</p>
              <p>
                <span>Rider:</span>
                <span className="text-blue-400 pl-2">
                  {tripInfo?.rider?.slice(0, 7)}...{tripInfo?.rider?.slice(-5)}
                </span>
              </p>
              <p>
                <span>Client:</span>
                <span className="text-blue-400 pl-2">
                  {tripInfo?.client?.slice(0, 7)}...{tripInfo?.client?.slice(-5)}
                </span>
              </p>
              <p>
                <span>Fare:</span>
                <span className="text-blue-500 pl-2">{tripInfo.fare} ETH</span>
              </p>
              <p>
                <span>Completed Status:</span>
                {tripInfo.isCompleted ? (
                  <span className="text-green-400 pl-2">✅ Completed</span>
                ) : (
                  <span className="text-red-400 pl-2">Pending</span>
                )}
              </p>
              <p>
                <span>Paid Status:</span>
                {tripInfo.isPaidOut ? (
                  <span className="text-green-400 pl-2">✅ Paid</span>
                ) : (
                  <span className="text-red-400 pl-2">Unpaid</span>
                )}
              </p>
            </div>
            {!tripInfo.isCompleted && (
              <button
                onClick={handleCompleteTrip}
                className="bg-purple-600  text-white px-3 py-2 rounded hover:bg-purple-700"
              >
                Complete Trip
              </button>
            )}
          </div>
        ) : (
          <div className="w-50">
            <p className="text-gray-500">No trips yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
