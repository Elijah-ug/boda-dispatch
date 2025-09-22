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
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { bodaContractConfig } from "@/contract/wagmiContractConfig";

export const AvailableClients = () => {
  const [clients, setClients] = useState([]);
  const [copied, setCopied] = useState(false);
  const [clientAddress, setClientAddress] = useState("");
  const { newTrips, loading, error } = useSelector((state) => state.newTrip);
  const dispatch = useDispatch();
  const { address } = useAccount();
  useEffect(() => {
    console.log("newTrips==> ", newTrips);
  }, [address]);
  useEffect(() => {
    dispatch(fetchAvailableTrips());
  }, [newTrips]);
  const handleCopyAddress = (addr) => {
    setClientAddress(addr);
    navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // const { data: nextTripId } = useReadContract({
  //     ...bodaContractConfig,
  //     functionName: "nextTripId",
  //   });
  //   const newTripId = nextTripId ? String(nextTripId - 1n) : undefined;
  const { writeContractAsync: acceptTrip, pending: acceptPending } = useWriteContract();
  const handleAcceptTrip = async (tripId) => {
    const accept = await acceptTrip({
      ...bodaContractConfig,
      functionName: "acceptTripRequest",
      args: [tripId],
    });
  };
  return (
    <div className="min-h-screen p-3 sm:px-10 text-gray-200">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {/* {clients.length > 0 ? ( */}
        {newTrips.map(
          (newTrip) =>
            !newTrip.isAccepted && (
              <Card key={newTrip.id} className="w-full sm:max-w-lg bg-gray-800 border-none text-gray-200">
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <span>Client: </span>
                      <span className="">
                        {newTrip?.client?.slice(0, 7)}...{newTrip?.client?.slice(-5)}
                      </span>
                      <div onClick={() => handleCopyAddress(newTrip?.client)} className="">
                        {clientAddress === newTrip?.client && copied ? (
                          <div className="flex items-center text-sm gap-1">
                            <FaCheck className="text-green-400" />
                            <span>copied</span>
                          </div>
                        ) : (
                          <FiCopy />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Pickup:</span>
                      <span>{newTrip?.pickup}</span>
                    </div>
                    {/*  */}
                    <div className="flex items-center gap-2">
                      <span>Destination:</span>
                      <span>{newTrip?.destination}</span>
                    </div>
                    {/*  */}
                    <div className="flex items-center gap-2">
                      <span>Distance:</span>
                      <span>{newTrip?.distance && `${newTrip.distance / 1000 + " Km"}`}</span>
                    </div>
                    {/*  */}
                    <div className="flex items-center gap-2">
                      <span>Fare:</span>
                      <span>{newTrip && `${newTrip.fare + " AFB"}`}</span>
                    </div>
                    <Button onClick={() => handleAcceptTrip(newTrip.tripId)}>Accept Trip</Button>
                  </div>
                </CardContent>
              </Card>
            )
        )}
        {/* ) : (
          <h3>No clients available</h3>
        )} */}
      </div>
    </div>
  );
};
