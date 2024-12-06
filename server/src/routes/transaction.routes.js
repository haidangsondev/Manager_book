import express from "express";
import { verifyAccessToken, verifyIsLibrarian } from "../utils/jwt.js";
import {
  borrowBook,
  returnBook,
  extendBorrowing,
  getBorrowHistory,
  getAllTransactions,
  getTransactionDetails,
  deleteTransaction,
} from "../controllers/transaction.controllers.js";

const router = express.Router();

router.post("/borrow", verifyAccessToken, borrowBook);
router.post("/return", verifyAccessToken, returnBook);
router.post("/extend", verifyAccessToken, extendBorrowing);
router.get("/history", verifyAccessToken, getBorrowHistory);

// LIBRARIAN
router.use(verifyAccessToken, verifyIsLibrarian);
router.get("/", getAllTransactions);
router.get("/:transactionId", getTransactionDetails);
router.delete("/:transactionId", deleteTransaction);
export default router;
