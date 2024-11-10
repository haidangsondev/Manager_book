import userModel from "../models/user.models.js";

export const getProfile = async ({ user_id }) => {
  const response = await userModel
    .findOne({ user_id })
    .select(" -refreshToken -emailToken");
  return response;
};

export const updateProfile = async (_id, data) => {
  return await userModel
    .findByIdAndUpdate(_id, data, { new: true })
    .select("-password -refreshToken -emailToken");
};

export const changePasswordProfile = async (_id, password) => {
  return await userModel
    .findByIdAndUpdate(_id, password, { new: true })
    .select("-password -refreshToken -emailToken");
};

export const getAllUsers = async () => {
  return await userModel.find().select("-password -refreshToken");
};
export const updateUserRole = async (userId, newRole) => {
  return await userModel.findByIdAndUpdate(
    userId,
    { role: newRole },
    { new: true }
  );
};
export const removeUser = async (userId) => {
  return await userModel.findByIdAndDelete(userId);
};
export const updateUserInfo = async (user_id, data) => {
  return await userModel
    .findByIdAndUpdate(user_id, data, { new: true })
    .select("-password -refreshToken -emailToken");
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
