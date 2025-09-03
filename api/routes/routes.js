import express from "express";
import { getUserRemoteAddress } from "../controllers/locationControllers.js";
import { getUserDestnation } from "../controllers/locationControllers.js";

const router = express.Router();

router.get('/', getUserRemoteAddress);
router.post("/", getUserDestnation)
// trips
router.post("/", addTrip);
router.get('/', getTrip);
router.delete('/:id', deleteTrip);

// transactions
router.post("/", addTxHistory);
router.get('/', getTxHistory);
router.delete('/:id', deleteTxHistory);

// Boda riders
router.post('/', addRider);
router.get('/', getRiders);
router.delete('/:id', deleteRider);

export default router;
