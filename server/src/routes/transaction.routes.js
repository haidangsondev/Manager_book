import express from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import {
  borrowBook,
  returnBook,
  extendBorrowing,
  getBorrowHistory,
} from "../controllers/transaction.controllers.js";

const router = express.Router();

router.post("/borrow", verifyAccessToken, borrowBook);
router.post("/return", verifyAccessToken, returnBook);
router.post("/extend", verifyAccessToken, extendBorrowing);
router.get("/history", verifyAccessToken, getBorrowHistory);
// router.get("/status", getBorrowedStatus);

export default router;
