import asyncHandler from "express-async-handler";
import { getBook } from "../services/book.services.js";
import {
  borrowBookUser,
  getborrowBookUser,
  getHistoryBorrowBooked,
  getTransactions,
  getTransactionById,
  deleteTransactionById,
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
      .status(404)
      .json({ success: false, message: "Sách không khả dụng." });
  }

  const due_date = new Date();
  due_date.setDate(due_date.getDate() + 7);

  const data = {
    user_id: _id,
    book_id,
    due_date,
  };
  const transaction = await borrowBookUser(data);

  book.available_copies -= 1;
  await book.save();

  await addBorrowed(_id, book_id);
  await addHistoryBorrowed(_id, transaction._id);

  return res.status(200).json({
    success: true,
    message: "Mượn sách thành công.",
    transaction,
  });
});

export const returnBook = asyncHandler(async (req, res) => {
  const { book_id } = req.body;
  const { _id } = req.user;

  const data = {
    user_id: _id,
    book_id,
    status: "mượn",
  };
  const transaction = await getborrowBookUser(data);
  if (!transaction) {
    return res
      .status(404)
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
  });
});

export const extendBorrowing = asyncHandler(async (req, res) => {
  const { book_id } = req.body;
  const { _id } = req.user;

  const data = {
    user_id: _id,
    book_id,
    status: "mượn",
  };
  const transaction = await getborrowBookUser(data);
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

  transaction.due_date = new Date(
    transaction.due_date.setDate(transaction.due_date.getDate() + 7)
  );
  await transaction.save();

  return res.status(200).json({
    success: true,
    message: "Gia hạn mượn sách thành công.",
    transaction,
  });
});

export const getBorrowHistory = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const history = await getHistoryBorrowBooked(_id);
  return res.status(history ? 200 : 404).json({
    success: history ? true : false,
    message: history
      ? "Danh sách lịch sử mượn sách."
      : "Không tìm thấy danh sách mượn",
    data: history,
  });
});

export const getAllTransactions = asyncHandler(async (req, res) => {
  const transactions = await getTransactions();
  return res.status(transactions ? 200 : 404).json({
    success: transactions ? true : false,
    message: transactions ? "Danh sách giao dịch." : "Giao dịch không tồn tại.",
    transactions,
  });
});

export const getTransactionDetails = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;

  const transaction = await getTransactionById(transactionId);

  return res.status(transaction ? 200 : 404).json({
    success: transaction ? true : false,
    message: transaction ? "Chi tiết giao dịch." : "Giao dịch không tồn tại.",
    transaction,
  });
});

export const deleteTransaction = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;

  const transaction = await deleteTransactionById(transactionId);
  return res.status(transaction ? 200 : 404).json({
    success: transaction ? true : false,
    message: transaction
      ? "Xóa giao dịch thành công."
      : "Giao dịch không tồn tại.",
  });
});
