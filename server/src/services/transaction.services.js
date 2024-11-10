import transactionModel from "../models/transaction.model.js";

export const borrowBookUser = async ({ user_id, book_id, due_date }) => {
  return await transactionModel.create({
    user_id,
    book_id,
    due_date,
  });
};

export const getborrowBookUser = async ({ user_id, book_id, status }) => {
  return await transactionModel.findOne({ user_id, book_id, status });
};

export const getHistoryBorrowBooked = async (_id) => {
  return await transactionModel
    .find({ user_id: _id })
    .populate("book_id", "title")
    .populate("user_id", "username");
};
