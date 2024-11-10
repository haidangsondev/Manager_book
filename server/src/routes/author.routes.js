import express from "express";
import { validateRequest } from "../middlewares/author.middleware.js";
import { verifyAccessToken, verifyIsAdmin } from "../utils/jwt.js";
import {
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/author.controllers.js";

const router = express.Router();

router.use(verifyAccessToken, verifyIsAdmin);
router.post("/", validateRequest("author"), createAuthor);
router.put("/:authorId", updateAuthor);
router.delete("/:authorId", deleteAuthor);
export default router;
