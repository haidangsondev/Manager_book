import express from "express";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { verifyAccessToken, verifyIsLibrarian } from "../utils/jwt.js";
import {
  createBook,
  editBook,
  removeBook,
  getBooks,
  getBookId,
  createReview,
  removeReview,
  getBookReviews,
  getBookReviewById,
  deleteBookReview,
} from "../controllers/book.controllers.js";

const router = express.Router();

router.use(verifyAccessToken);
router.get("/", getBooks);
router.get("/:bookId", getBookId);
router.post("/review/:bookId", validateRequest("review"), createReview);
router.delete("/review/:reviewId", removeReview);

// LIBRARIAN
router.use(verifyAccessToken, verifyIsLibrarian);
router.post("/", validateRequest("book"), createBook);
router.put("/:bookId", editBook);
router.delete("/:bookId", removeBook);
router.get("/review/:reviewId", getBookReviewById);
router.get("/review", getBookReviews);
router.delete("/review/:reviewId", deleteBookReview);

export default router;
