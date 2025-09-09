import express from "express";
import { addTrip, deleteTrip, getTrip } from "../controllers/tripsControllers.js";
import { addTxHistory, deleteTxHistory, getTxHistory } from "../controllers/txControllers.js";
import { addRider, deleteRider, getRiders } from "../controllers/ridersController.js";

const router = express.Router();
//trips
router.post("/", addTrip);
router.get("/", getTrip);
router.delete("/:id", deleteTrip);

// transactions
router.post("/", addTxHistory);
router.get("/", getTxHistory);
router.delete("/:id", deleteTxHistory);

// Boda riders
router.post("/riders", addRider);
router.get("/riders", getRiders);
router.delete("/riders:id", deleteRider);

export default router;
