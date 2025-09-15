import { Button } from "@/components/ui/button";
import { fetchCurrentTripId } from "@/features/clients/trip/tripData/currentTripIdThunk";
import { fetchTripThunk } from "@/features/clients/trip/tripData/tripThunk";
import { FiCopy } from "react-icons/fi";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAvailableTrips } from "@/features/readData/trips";
import { acceptTripThunk } from "@/features/riders/trigger/acceptTripThunk";

export const AvailableClients = () => {
  const [clients, setClients] = useState([]);
  // const [copied, setCopied] = useState(false);
  // const [clientAddress, setClientAddress] = useState("");
  const { newTrips, loading, error } = useSelector((state) => state.newTrip);
  const dispatch = useDispatch();
  console.log("newTrips==> ", newTrips);
  // useEffect(() => {
  //   dispatch(fetchCurrentTripId())
  //     .unwrap()
  //     .then((tripId) => {
  //       console.log("Trip Id =>", tripId);
  //       dispatch(fetchTripThunk(tripId));
  //     })
  //     .catch((error) => {
  //       toast.error("Falied to load trip: " + error.message);
  //     });
  // }, []);

  // const availableClients = async () => {
  //   try {
  //     const res = await fetch(import.meta.env.VITE_CLIENT_URL);
  //     const data = await res.json();
  //     setClients(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  useEffect(() => {
    // availableClients();
    // dispatch(fetchAvailableTrips());
  }, []);
  const handleCopyAddress = (addr) => {
    setClientAddress(addr);
    navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="min-h-screen p-3 sm:px-10 text-gray-200
      <h1>Hello world</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3">
        {clients.length > 0 ? (
          <Card className="w-xs max-w-lg bg-gray-600 border-none text-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-300">Destination</CardTitle>
            </CardHeader>
            <CardContent>
              {/* {clients.map((client)=>
              
              )} */}
            </CardContent>
            <CardFooter>
              <Button>Accept Trip</Button>
            </CardFooter>
          </Card>
        ) : (
          <h3>No clients available</h3>
        )}
      </div>
      {/* <div key={client.id} className="">
                <div className="flex">
                <div className="flex items-center gap-2 cursor-pointer">
                  <span className="">
                    {tripInfo?.client?.slice(0, 7)}...{tripInfo?.client?.slice(-5)}
                  </span>
                  <div onClick={() => handleCopyAddress(tripInfo?.client)} className="">
                    {clientAddress === tripInfo?.client && copied ? (
                      <div className="flex items-center text-sm gap-1">
                        <FaCheck className="text-green-400" />
                        <span>copied</span>
                      </div>
                    ) : (
                      <FiCopy />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex">
                <span>Destination:</span>
                <span></span>
              </div>

              <div className="flex">
                <span>Distance:</span>
                <span>{tripInfo?.distance ? tripInfo.distance / 1000 + "Km" : "N/A"}</span>
              </div>
              </div> */}
    </div>
  );
};
