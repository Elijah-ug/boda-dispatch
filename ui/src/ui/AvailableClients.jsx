import { Button } from "@/components/ui/button";
import { fetchCurrentTripId } from "@/features/clients/trip/tripData/currentTripIdThunk";
import { fetchTripThunk } from "@/features/clients/trip/tripData/tripThunk";
import { FiCopy } from "react-icons/fi";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export const AvailableClients = () => {
  const [copied, setCopied] = useState(false);
  const [clientAddress, setClientAddress] = useState("");
  const { tripInfo } = useSelector((state) => state.trips);
  const dispatch = useDispatch();
  console.log(tripInfo);
  useEffect(() => {
    dispatch(fetchCurrentTripId())
      .unwrap()
      .then((tripId) => {
        console.log("Trip Id =>", tripId);
        dispatch(fetchTripThunk(tripId));
      })
      .catch((error) => {
        toast.error("Falied to load trip: " + error.message);
      });
  }, []);

  const handleCopyAddress = (addr) => {
    setClientAddress(addr);
    navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div>
      {tripInfo.client ? (
        <div>
          <div className="flex">
            <div className="flex items-center gap-1">
              <span className="text-sm ">
                {tripInfo?.client?.slice(0, 7)}...{tripInfo?.client?.slice(-5)}
              </span>
              <Button onClick={() => handleCopyAddress(tripInfo?.client)} className="bg-gray-600 hover:bg-gray-600">
                {clientAddress === tripInfo?.client && copied ? (
                  <FaCheck className="text-green-400 text-sm font-extralight" />
                ) : (
                  <FiCopy />
                )}
              </Button>
            </div>
          </div>
          <div className="flex">
            <span>Distance:</span>
            <span>{tripInfo?.distance ? tripInfo.distance / 1000 + "Km" : "N/A"}</span>
          </div>
        </div>
      ) : (
        <p>No trip fetched</p>
      )}
    </div>
  );
};
