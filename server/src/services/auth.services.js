import userModel from "../models/user.models.js";

export const checkEmail = async (email) => {
  return await userModel.findOne({ email });
};
export const checkPasswordToken = async (passwordResetToken) => {
  return await userModel.findOne({ passwordResetToken });
};

export const checkUserRefreshAccessToken = async ({
  user_id,
  refreshToken,
}) => {
  return await userModel.findOne({ user_id, refreshToken });
};

export const registerUser = async (data) => {
  return await userModel.create(data)
};

export const updateUser = async (id, data) => {
  await userModel.findByIdAndUpdate(id, data, { new: true });
};
