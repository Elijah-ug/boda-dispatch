import { client } from "../prisma/client.js";

export const addRider = async (req, res) => {
  try {
    console.log("coming to post");
    const { riderId, user, earnings, stars, totalTrips, isRegistered } = await req.boday;
    const rider = await client.rider.upsert({
      where: { user },
      update: { earnings, stars, totalTrips },
      create: { riderId, user, earnings, stars, totalTrips, isRegistered },
    });
    console.log(rider);
    return res.status(200).json(rider);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const getRiders = async (req, res) => {
  try {
    console.log("Logging riders");
    const riders = await client.rider.findMany();
    console.log(riders);
    res.status(200).json(riders);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteRider = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};
