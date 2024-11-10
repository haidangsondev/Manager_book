import express from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import {
  reserveBook,
  getReservations,
  cancelBookReservation,
} from "../controllers/reversation.controllers.js";

const router = express.Router();

router.post("/", verifyAccessToken, reserveBook);

router.get("/", verifyAccessToken, getReservations);

router.patch(
  "/cancel/:reservation_id",
  verifyAccessToken,
  cancelBookReservation
);

export default router;
