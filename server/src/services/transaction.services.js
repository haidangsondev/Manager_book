import transactionModel from "../models/transaction.model.js";

export const borrowBookUser = async (data) => {
  return await transactionModel.create(data);
};

export const getborrowBookUser = async (data) => {
  return await transactionModel.findOne(data).exec();
};

export const getHistoryBorrowBooked = async (_id) => {
  return await transactionModel
    .find({ user_id: _id })
    .populate("book_id", "title");
};

export const getTransactions = async () => {
  return await transactionModel
    .find()
    .populate("user_id", "username")
    .populate("book_id", "title");
};

export const getTransactionById = async (id) => {
  return await transactionModel
    .findById(id)
    .populate("user_id", "username email")
    .populate("book_id", "title author");
};

export const deleteTransactionById = async (id) => {
  return await transactionModel.findByIdAndDelete(id);
};
