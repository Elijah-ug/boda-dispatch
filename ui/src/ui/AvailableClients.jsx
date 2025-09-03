import { fetchCurrentTripId } from "@/features/clients/trip/tripData/currentTripIdThunk";
import { fetchTripThunk } from "@/features/clients/trip/tripData/tripThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const AvailableClients = () => {
    const { tripInfo } = useSelector(state => state.trips);
    const dispatch = useDispatch()
    console.log(tripInfo)
    useEffect(() => {
      dispatch(fetchCurrentTripId())
        .unwrap()
        .then(tripId => {
            console.log('Trip Id =>', tripId);
            dispatch(fetchTripThunk(tripId))
        })
        .catch(error => {
                toast.error('Falied to load trip: ' + error.message);
              });
    }, []);
  return (
      <div>
          {!tripInfo.rider ? (
              <div>
                  <div className="flex">
                      <span>Client:</span>
                      <span>{ tripInfo.client}</span>
                  </div>
          </div>
          ) : ( <p></p> )}
    </div>
  )
}
