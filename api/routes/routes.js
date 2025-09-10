import express from "express";
import { addTrip, deleteTrip, getTrip } from "../controllers/tripsControllers.js";
import { addTxHistory, deleteTxHistory, getTxHistory } from "../controllers/txControllers.js";
import { addRider, deleteRider, getRiders } from "../controllers/ridersController.js";
import { addClient, deleteClient, getClients } from "../controllers/clientController.js";

const router = express.Router();
//trips
router.post("/trips", addTrip);
router.get("/trips", getTrip);
router.delete("/trips:id", deleteTrip);

// transactions
router.post("/tx", addTxHistory);
router.get("/tx", getTxHistory);
router.delete("/tx:id", deleteTxHistory);

// Boda riders
router.post("/riders", addRider);
router.get("/riders", getRiders);
router.delete("/riders:id", deleteRider);

// clients
router.post("/clients", addClient);
router.get("/clients", getClients);
router.delete("/clients:id", deleteClient);

export default router;
