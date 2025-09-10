import { prisma } from "../prisma/client.js";

export const addTxHistory = async (req, res) => {
  const { txHash, gasUsed, to, from } = req.body;
  const tx = await prisma.transaction.create({ data: { txHash, gasUsed, to, from } });
  console.log("transaction updated: ", tx);
  res.status(200).json(tx);
  try {
  } catch (error) {
    console.log(error.message);
  }
};

export const getTxHistory = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTxHistory = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};
