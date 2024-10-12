import express from "express";

import { verifyAccessToken, verifyIsAdmin } from "../utils/jwt.js";
import {
  borrowBook,
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  getBorrowBook,
  returnBook,
  reviewBook,
  searchBooks,
  updateBook,
} from "../controllers/book.controllers.js";
import { validateRequest } from "../middlewares/book.middleware.js";

const bookRouter = express.Router();

bookRouter.use(verifyAccessToken);

bookRouter.post("/", verifyIsAdmin, validateRequest("create-book"), createBook);
bookRouter.put("/:id", verifyIsAdmin, updateBook);
bookRouter.delete("/:id", verifyIsAdmin, deleteBook);
bookRouter.get("/", getBooks);
bookRouter.get("/borrow", getBorrowBook);
bookRouter.get("/search", searchBooks);
bookRouter.get("/:id", getBookById);
bookRouter.post("/borrow/:id", borrowBook);
bookRouter.post("/return/:id", returnBook);
bookRouter.post("/review/:id", validateRequest("review"), reviewBook);
export default bookRouter;
