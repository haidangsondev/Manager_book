import express from "express";
import { validateRequest } from "../middlewares/book.middleware.js";
import { verifyAccessToken, verifyIsAdmin } from "../utils/jwt.js";
import {
  createBook,
  editBook,
  removeBook,
  getBooks,
  getBookId,
  manageBookQuantity,
} from "../controllers/book.controllers.js";

const router = express.Router();

router.use(verifyAccessToken, verifyIsAdmin);
router.get("/", getBooks);
router.get("/:bookId", getBookId);
router.post("/", validateRequest("book"), createBook);
router.put("/:bookId", editBook);
router.delete("/:bookId", removeBook);
router.patch("/update-quantity/:bookId", manageBookQuantity);
export default router;
