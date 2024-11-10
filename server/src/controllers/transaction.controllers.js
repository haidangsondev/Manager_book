import asyncHandler from "express-async-handler";
import { getBook } from "../services/book.services.js";
import {
  borrowBookUser,
  getborrowBookUser,
  getHistoryBorrowBooked,
} from "../services/transaction.services.js";
import {
  addBorrowed,
  addHistoryBorrowed,
  removeBorrowed,
} from "../services/user.services.js";

export const borrowBook = asyncHandler(async (req, res) => {
  const { book_id } = req.body;
  const { _id } = req.user;
  const book = await getBook(book_id);
  if (!book || book.available_copies <= 0) {
    return res
      .status(400)
      .json({ success: false, message: "Sách không khả dụng." });
  }

  const due_date = new Date();
  due_date.setDate(due_date.getDate() + 14);

  const transaction = await borrowBookUser({
    user_id: _id,
    book_id,
    due_date,
  });

  book.available_copies -= 1;
  await book.save();

  await addBorrowed(_id, book_id);
  await addHistoryBorrowed(_id, transaction._id);

  return res.status(201).json({
    success: true,
    message: "Mượn sách thành công.",
    data: transaction,
  });
});

export const returnBook = asyncHandler(async (req, res) => {
  const { book_id } = req.body;
  const { _id } = req.user;

  const transaction = await getborrowBookUser({
    user_id: _id,
    book_id,
    status: "mượn",
  });
  if (!transaction) {
    return res
      .status(400)
      .json({ success: false, message: "Không tìm thấy giao dịch." });
  }

  transaction.return_date = new Date();
  transaction.status = "đã trả";

  const today = new Date();
  if (transaction.due_date < today) {
    transaction.fine = Math.ceil(
      (today - transaction.due_date) / (1000 * 60 * 60 * 24)
    );
  }

  await transaction.save();

  const book = await getBook(book_id);
  book.available_copies += 1;
  await book.save();

  await removeBorrowed(_id, book_id);

  return res.status(200).json({
    success: true,
    message: "Trả sách thành công.",
    data: transaction,
  });
});

export const extendBorrowing = asyncHandler(async (req, res) => {
  const { book_id } = req.body;
  const { _id } = req.user;

  const transaction = await getborrowBookUser({
    user_id: _id,
    book_id,
    status: "mượn",
  });
  if (!transaction) {
    return res
      .status(400)
      .json({ success: false, message: "Không tìm thấy giao dịch." });
  }

  const book = await getBook(book_id);
  if (book.reserved_copies > 0) {
    return res.status(400).json({
      success: false,
      message: "Sách đã được đặt trước bởi người khác.",
    });
  }

  transaction.due_date.setDate(transaction.due_date.getDate() + 7);
  await transaction.save();

  return res.status(200).json({
    success: true,
    message: "Gia hạn mượn sách thành công.",
    data: transaction,
  });
});

export const getBorrowHistory = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const history = await getHistoryBorrowBooked(_id);
  return res.status(200).json({
    success: true,
    message: "Danh sách lịch sử mượn sách.",
    data: history,
  });
});
