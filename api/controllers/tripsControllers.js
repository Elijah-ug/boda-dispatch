import { prisma } from "../prisma/client.js";

export const addTrip = async (req, res) => {
  try {
    console.log("We gat the data ==>", req.body);
    const {
      fare,
      rider,
      client,
      distance,
      tripId,
      isAccepted,
      tripStarted,
      isCompleted,
      isPaidOut,
      pickup,
      destination,
    } = req.body;
    const trips = await prisma.trip.upsert({
      where: { tripId },
      update: { rider, tripStarted, isAccepted, isCompleted, isPaidOut, pickup },
      create: {
        fare,
        rider,
        client,
        distance,
        tripId,
        isAccepted,
        tripStarted,
        isCompleted,
        isPaidOut,
        pickup,
        destination,
      },
    });
    console.log(trips);
    res.status(200).json(trips);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: `An error occured ==> ${error.message}` });
  }
};

export const getTrip = async (req, res) => {
  try {
    console.log("We gat the data");
    const trips = await prisma.trip.findMany();
    res.status(200).json(trips);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTrip = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};
