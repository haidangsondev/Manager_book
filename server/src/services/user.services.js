import userModel from "../models/user.models.js";
import { hashPasswrod } from "../utils/password.js";

export const getProfile = async (_id) => {
  return await userModel
    .findById(_id)
    .select(" -refreshToken -emailToken  -passwordResetToken");
};

export const updateProfile = async (_id, data) => {
  return await userModel
    .findByIdAndUpdate(_id, data, { new: true })
    .select("-password -refreshToken -emailToken -passwordResetToken");
};

export const checkUsernameUser = async (username) => {
  return await userModel.findOne({ username });
};

export const addUser = async (username, password) => {
  return await userModel.create({
    username,
    password: await hashPasswrod(password),
    isVerify: true,
  });
};

export const getAllUser = async (query) => {
  return await userModel.find(query).select("-password -refreshToken");
};

export const removeUser = async (id) => {
  return await userModel.findByIdAndDelete(id);
};

export const addBorrowed = async (_id, book_id) => {
  return await userModel.findByIdAndUpdate(
    _id,
    {
      $push: {
        borrowedBooks: {
          bookId: book_id,
        },
      },
    },
    { new: true }
  );
};
export const removeBorrowed = async (_id, book_id) => {
  return await userModel.findByIdAndUpdate(
    _id,
    {
      $pull: {
        borrowedBooks: {
          bookId: book_id,
        },
      },
    },
    { new: true }
  );
};
export const addHistoryBorrowed = async (_id, transaction_id) => {
  return await userModel.findByIdAndUpdate(
    _id,
    {
      $push: {
        history: {
          transactionId: transaction_id,
        },
      },
    },
    { new: true }
  );
};

export const addReversationBook = async (_id, reversation_id) => {
  return await userModel.findByIdAndUpdate(
    _id,
    {
      $push: {
        reservedBooks: {
          reversationId: reversation_id,
        },
      },
    },
    { new: true }
  );
};
export const removeReversationBook = async (_id, reversation_id) => {
  return await userModel.findByIdAndUpdate(
    _id,
    {
      $pull: {
        reservedBooks: {
          reversationId: reversation_id,
        },
      },
    },
    { new: true }
  );
};
