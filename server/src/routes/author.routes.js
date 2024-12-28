import express from "express";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { verifyAccessToken, verifyIsLibrarian } from "../utils/jwt.js";
import {
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthors,
} from "../controllers/author.controllers.js";

const router = express.Router();

router.use(verifyAccessToken, verifyIsLibrarian);
router.post("/", validateRequest("author"), createAuthor);
router.get("/", getAuthors);
router.put("/:authorId", updateAuthor);
router.delete("/:authorId", deleteAuthor);
export default router;
