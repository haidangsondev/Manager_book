import {
  getAllUsers,
  getProfile,
  updateProfile,
} from "../services/user.services.js";
import asyncHandler from "express-async-handler";
import { checkPassword, hashPasswrod } from "../utils/password.js";

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const User = await getProfile({ _id });

  return res.status(User ? 200 : 404).json({
    success: User ? true : false,
    message: User ? "Lấy người dùng thành công" : "Không tìm thấy người dùng",
    user: User ? User : "",
  });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const updatedData = req.body;

  const data = { ...updatedData };
  if (req.file) data.avatar = req.file.path;
  const User = await updateProfile(_id, data);
  return res.status(User ? 200 : 500).json({
    success: User ? true : false,
    message: User
      ? `Cập nhật thông tin thành công`
      : "Cập nhật thông tin thất bại",
    user: User,
  });
});

export const changeUserPassword = async (req, res) => {
  const { _id } = req.user;
  const { currentPassword, newPassword } = req.body;

  const user = await getProfile({ _id });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Người dùng không tồn tại",
    });
  }

  const isMatch = await checkPassword(currentPassword, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Mật khẩu hiện tại không đúng",
    });
  }

  user.password = await hashPasswrod(newPassword);
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Đổi mật khẩu thành công",
  });
};

export const getUsers = asyncHandler(async (req, res, next) => {
  const { email, username } = req.query;

  const query = {};
  if (email) query.email = email;
  if (username) query.username = username;
  const User = await getAllUsers(query);

  return res.status(User ? 200 : 404).json({
    success: User ? true : false,
    message: User ? "Danh sách người dùng" : "Không tìm thấy người dùng",
    user: User ? User : "",
  });
});

export const changeUserRole = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { newRole } = req.body;

  const validRoles = ["admin", "người dùng", "thủ thư"];
  if (!validRoles.includes(newRole)) {
    return res.status(400).json({
      success: false,
      message: "Vai trò không hợp lệ",
    });
  }

  const user = await updateUserRole(userId, newRole);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Người dùng không tồn tại",
    });
  }

  return res.status(200).json({
    success: true,
    message: `Đã cập nhật vai trò người dùng thành ${newRole}`,
    data: user,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await removeUser(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Người dùng không tồn tại",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Đã xóa người dùng thành công",
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const updatedData = req.body;

  const data = { ...updatedData };
  if (req.file) data.avatar = req.file.path;
  const User = await updateUserInfo(userId, data);
  return res.status(User ? 200 : 500).json({
    success: User ? true : false,
    message: User
      ? `Cập nhật thông tin người dùng thành công`
      : "Cập nhật thông tin người dùng thất bại",
    user: User,
  });
});
