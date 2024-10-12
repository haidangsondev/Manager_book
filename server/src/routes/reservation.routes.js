import express from "express";
import { verifyAccessToken, verifyIsAdmin } from "../utils/jwt.js";
import {
  cancelReservation,
  createReservation,
  fulfillReservation,
  getUserReservations,
} from "../controllers/reservation.controllers.js";

const reservationRouter = express.Router();

reservationRouter.post("/", verifyAccessToken, createReservation);
reservationRouter.get("/", verifyAccessToken, getUserReservations);
reservationRouter.put(
  "/cancel/:reservationId",
  verifyAccessToken,
  cancelReservation
);
reservationRouter.put(
  "/fulfill/:reservationId",
  verifyAccessToken,
  verifyIsAdmin,
  fulfillReservation
);

export default reservationRouter;
