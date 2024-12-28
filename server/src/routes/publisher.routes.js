import express from "express";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { verifyAccessToken, verifyIsLibrarian } from "../utils/jwt.js";
import {
  deletePublisher,
  getPublishers,
  updatePublisher,
  createPublisher,
} from "../controllers/publisher.controllers.js";

const router = express.Router();

router.use(verifyAccessToken, verifyIsLibrarian);
router.post("/", validateRequest("publisher"), createPublisher);
router.get("/", getPublishers);
router.put("/:publisherId", updatePublisher);
router.delete("/:publisherId", deletePublisher);
export default router;
