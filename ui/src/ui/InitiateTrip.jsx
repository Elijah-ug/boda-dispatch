import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { fetchInitiateTripThunk } from '@/features/clients/trip/initiateTrip/initiateTripThunk';
import { parseEther } from 'ethers';
import { getDistance } from 'geolib';
import React, { useEffect, useState } from 'react';
import { useGeolocated } from 'react-geolocated';
import { useDispatch } from 'react-redux';

export default function InitiateTrip() {
  const [route, setRoute] = useState('');
  const [pickup, setPickup] = useState(null);
  const [duration, setDuration] = useState(null);
  const [city, setCity] = useState('');
  const [destinationIp, setDestinationIp] = useState({ latitude: '', longitude: '' });
  const dispatch = useDispatch();
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 3000,
  });

  const getDestinationIp = async () => {
    try {
      if (city) {
        const currentLocation = await fetch(
          `https://geocode.maps.co/search?city=${city}&api_key=68b3438e46e12347100603fqe72acb7`
        );
        const data = await currentLocation.json();
        const relevantLocation = data.find(loc => loc.lat && loc.lon);

        // console.log('relevantLocation => ', relevantLocation?.lat, relevantLocation?.lon);
        setDestinationIp({ latitude: relevantLocation?.lat, longitude: relevantLocation?.lon });
        // console.log('city: ', city);
      } else {
        console.log('No city found');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //   console.log('destinationIp: ', destinationIp);
  //   useEffect(() => {
  //     getDestinationIp();
  //   }, [city]);

  useEffect(() => {
    if (coords?.latitude && coords?.longitude) {
      setPickup({ lat: coords?.latitude, lon: coords?.longitude });
    }
  }, [coords]);
  useEffect(() => {
    if (coords?.latitude && coords?.longitude && destinationIp?.latitude && destinationIp?.longitude) {
      const distanceInMeters = getDistance(pickup, destinationIp);
      const distanceInKm = distanceInMeters / 1000;
      //   console.log(`Distance via geolib: ${distanceInKm.toFixed(2)} km`);
    }
  }, [coords, destinationIp]);

  useEffect(() => {
    const fetchORSRoute = async () => {
      if (coords?.latitude && coords?.longitude && destinationIp?.latitude && destinationIp?.longitude) {
        const start = `${coords.longitude},${coords.latitude}`;
        const end = `${destinationIp.longitude},${destinationIp.latitude}`;
        const res = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImI0ODcyZTY3OWNjZTRhM2JiNjc4ZTU3ZmI1ZTUwYTQ4IiwiaCI6Im11cm11cjY0In0=&start=${start}&end=${end}`
        );
        const data = await res.json();
        const distanceInMeters = await data?.features[0].properties.summary;
        const distanceInKm = (await distanceInMeters.distance) / 1000;
        const formattedDistance = distanceInKm.toFixed(2);
        const seconds = await distanceInMeters.duration;
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        if (hrs > 0) {
          setDuration({ hrs, mins });
        } else if (mins > 0) {
          setDuration({ mins });
        } else {
          setDuration({ secs });
        }
        setRoute(formattedDistance);
      }
    };
    fetchORSRoute();
  }, [pickup, destinationIp]);
  const handleSubmitDestination = () => {
    getDestinationIp();
    if (!city) {
      alert('Missing fields');
      return;
    }
    console.log('Distance in KM is: ==>', route);
    //   console.log('city: ', city);
    const parsedBaseFare = parseFloat(import.meta.env.VITE_BASEFARE);
    const parsedPerKmRate = parseFloat(import.meta.env.VITE_PERKMRATE);
    const calculatedFare = Math.floor((parsedBaseFare + parseFloat(route) * parsedPerKmRate) * 100) / 100;
    // const distanceMeters = Math.round(parseFloat(route) * 1000);
    console.log('duration==>', duration, 'city==>', city, 'calculatedFare=>', calculatedFare);
    if (!route) {
      alert('Missing Distance');
      return;
    }
    dispatch(
      fetchInitiateTripThunk({
        distance: Math.round(parseFloat(route) * 1000),
        fare: parseEther(calculatedFare.toString()),
      })
    );
    // console.log('distanceMeters: ==>', typeof route, route);
    setCity('');
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
              <div className="grid gap-2">
                <Input
                  id="distance"
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
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
