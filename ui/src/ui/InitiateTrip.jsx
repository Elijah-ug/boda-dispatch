import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchInitiateTripThunk } from "@/features/clients/trip/initiateTrip/initiateTripThunk";
import { parseEther } from "ethers";
import { getDistance } from "geolib";
import { IPInfoContext } from "ip-info-react";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function InitiateTrip() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState({ lon: null, lat: null });
  const [distance, setDistance] = useState("");
  const [pickup, setPickup] = useState("");
  const [fare, setFare] = useState("");
  const [destination, setDestination] = useState("");
  const [destinationIp, setDestinationIp] = useState({ longitude: "", latitude: "" });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lon: position.coords.longitude,
            lat: position.coords.latitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation not available in this browser.");
    }
  }, []);
  const getDestinationIp = async () => {
    try {
      if (destination) {
        const currentLocation = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            destination + ", Kampala, Uganda"
          )}&key=b69b036ac3324887a08a2a335f2f2254`
        );
        const data = await currentLocation.json();
        console.log(data);
        const relevant = await data.results[0].bounds.northeast;
        console.log("relevant: ", relevant);
        setDestinationIp({ longitude: relevant?.lng, latitude: relevant?.lat });

        // const distanceInMeters = getDistance(location, destinationIp);
        // const distanceInKm = distanceInMeters / 1000;
        // console.log(`Distance via geolib: ${distanceInKm.toFixed(2)} km && in m => ${distanceInMeters}m`);

        return relevant;
      } else {
        console.log("No destination found");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (location && destinationIp.latitude && destinationIp.longitude) {
      const dist = getDistance(location, destinationIp);
      setDistance(dist / 1000);
      console.log("Geolib distance: ", destinationIp, location, `${dist / 1000} km`);
    }
  }, [destinationIp, location]);

  useEffect(() => {
    const getcurrentPlaceName = async () => {
      try {
        const res = await fetch(`https://photon.komoot.io/reverse?lat=${location.lat}&lon=${location.lon}
`);
        const data = await res.json();
        const name = await data.features[0].properties.name;
        setPickup(name);
        console.log("data fetched is ==>", data, "My location is name: =>", name);
        return name;
      } catch (error) {}
    };
    getcurrentPlaceName();
    console.log("pickup ===>: ", pickup);
  }, [location]);
  useEffect(() => {
    if (destination) {
      getDestinationIp();
    }
  }, [destination]);
  const handleSubmitDestination = async () => {
    const parsedBaseFare = parseFloat(import.meta.env.VITE_BASEFARE);
    const parsedPerKmRate = parseFloat(import.meta.env.VITE_PERKMRATE);
    const calculatedFare = Math.floor((parsedBaseFare + parseFloat(distance) * parsedPerKmRate) * 100) / 100;
    setFare(calculatedFare);
    // const distanceMeters = Math.round(parseFloat(route) * 1000);
    console.log(
      "parsedBaseFare==>",
      parsedBaseFare,
      "parsedPerKmRate==>",
      parsedPerKmRate,
      "calculatedFare=>",
      calculatedFare
    );
    console.log(
      "pickup: ",
      pickup,
      "destination: ",
      destination,
      "distance: ",
      distance,
      "calculatedFare",
      calculatedFare
    );
    if (pickup && destination && distance && calculatedFare) {
      dispatch(
        fetchInitiateTripThunk({
          pickup,
          destination,
          distance: Math.round(parseFloat(distance) * 1000),
          fare: parseEther(calculatedFare.toString()).toString(),
        })
      );
    }
    // console.log('distanceMeters: ==>', typeof route, route);
    setDestination("");
  };

  return (
    <div>
      <Card className="w-full max-w-lg bg-gray-600 border-none">
        <CardHeader>
          <CardTitle className="text-gray-300">Destination</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              {/* <div className="grid gap-2">
                <Input
                  id="pickup"
                  type="text"
                  value={pickup}
                  onChange={e => setPickup(e.target.value)}
                  placeholder="Kisaasi"
                  required
                />
              </div> */}

              <div className="grid gap-2">
                <Input
                  id="distance"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Kisaasi"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Button type="button" onClick={handleSubmitDestination} className="w-full">
                  Initiate Trip
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
