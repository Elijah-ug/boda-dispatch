import { client } from "../prisma/client.js";

export const addClient = async (req, res) => {
  try {
    const { balance, clientId, hasSomeBalance, isRegistered, user } = req.body;
    const newClient = await client.client.upsert({
      where: { user },
      update: { balance, hasSomeBalance },
      create: { balance, clientId, hasSomeBalance, isRegistered, user },
    });
    // console.log(newClient);
    return res.status(200).json(newClient);
  } catch (error) {
    console.log(error.messge);
    res.status(409).json({ message: `An error occured ==> ${error.message}` });
  }
};
export const getClient = async () => {
  try {
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: `An error occured ==> ${error.message}` });
  }
};

export const deleteClient = async () => {
  try {
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: `An error occured ==> ${error.message}` });
  }
};
