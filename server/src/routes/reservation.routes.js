import express from "express";
import { verifyAccessToken, verifyIsLibrarian } from "../utils/jwt.js";
import {
  reserveBook,
  getReservations,
  cancelBookReservation,
  getAllReservations,
  getReservationDetails,
  deleteReservation,
  updateReservationStatus,
} from "../controllers/reversation.controllers.js";

const router = express.Router();
router.post("/", verifyAccessToken, reserveBook);
router.get("/", verifyAccessToken, getReservations);
router.patch(
  "/cancel/:reservationId",
  verifyAccessToken,
  cancelBookReservation
);

// LIBRARIAN
router.use(verifyAccessToken, verifyIsLibrarian);
router.get("/", getAllReservations);
router.get("/:reservationId", getReservationDetails);
router.delete("/:reservationId", deleteReservation);
router.patch("/:reservationId", updateReservationStatus);
export default router;
