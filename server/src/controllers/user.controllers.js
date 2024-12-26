import {
  addUser,
  checkUsernameUser,
  getAllUser,
  getProfile,
  removeUser,
  updateProfile,
  // updateUserInfo,
} from "../services/user.services.js";
import asyncHandler from "express-async-handler";
import { checkPassword, hashPasswrod } from "../utils/password.js";

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const User = await getProfile(_id);

  return res.status(User ? 200 : 404).json({
    success: User ? true : false,
    message: User ? "Lấy người dùng thành công" : "Không tìm thấy người dùng",
    data: User,
  });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const updatedData = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Thông tin cập nhật là bắt buộc",
    });
  }
  const data = { ...updatedData };
  // Trường hợp có file ảnh gửi lên
  if (req.file) data.avatar = req.file.path;
  const User = await updateProfile(_id, data);

  return res.status(User ? 200 : 500).json({
    success: User ? true : false,
    message: User
      ? `Cập nhật thông tin thành công`
      : "Có lỗi hệ thống xảy ra khi cập nhật thông tin",
    data: User ? User : "",
  });
});

export const changeUserPassword = async (req, res) => {
  const { _id } = req.user;
  const { currentPassword, newPassword } = req.body;

  const user = await getProfile(_id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Người dùng không tồn tại",
    });
  }

  // Kiểm tra sự trùng khớp mật khẩu
  const isMatch = await checkPassword(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Mật khẩu hiện tại không đúng",
    });
  }

  // Lưu mật khẩu mới
  user.password = await hashPasswrod(newPassword);
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Đổi mật khẩu thành công",
  });
};

// export const changeUserRole = asyncHandler(async (req, res) => {
//   const { userId } = req.params;
//   const { newRole } = req.body;

//   const validRoles = ["admin", "người dùng", "thủ thư"];
//   if (!validRoles.includes(newRole)) {
//     return res.status(400).json({
//       success: false,
//       message: "Vai trò không hợp lệ",
//     });
//   }

//   const user = await updateUserRole(userId, newRole);

//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "Người dùng không tồn tại",
//     });
//   }

//   return res.status(200).json({
//     success: true,
//     message: `Đã cập nhật vai trò người dùng thành ${newRole}`,
//     data: user,
//   });
// });

// LIBRARIAN

export const createUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const Username = await checkUsernameUser(username);
  if (Username) {
    return res.status(409).json({
      success: false,
      message: "Tên người dùng đã tồn tại",
    });
  }
  const user = await addUser(username, password);

  return res.status(201).json({
    success: true,
    message: "Tạo người dùng thành công",
    user,
  });
});

export const getUsers = asyncHandler(async (req, res, next) => {
  const { username } = req.query;

  // Thủ thư chỉ có thể quản lý được người dùng có quyền là user
  const query = {};
  query.role = "user";

  if (username) {
    // Sử dụng biểu thức chính quy để tìm kiếm không phân biệt chữ hoa chữ thường
    query.username = { $regex: new RegExp(username, "i") };
  }

  const users = await getAllUser(query);

  return res.status(users.length > 0 ? 200 : 404).json({
    success: users.length > 0,
    message:
      users.length > 0 ? "Danh sách người dùng" : "Không tìm thấy người dùng",
    data: users,
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const updatedData = req.body;

  // Kiểm tra dữ liệu trống
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Thông tin cập nhật là bắt buộc",
    });
  }

  // Kiểm tra file ảnh
  const data = { ...updatedData };
  if (req.file) data.avatar = req.file.path;

  const User = await updateProfile(userId, data);

  return res.status(User ? 200 : 500).json({
    success: User ? true : false,
    message: User
      ? "Cập nhật thông tin người dùng thành công"
      : "Có xảy ra lỗi hệ thống khi cập nhật thông tin",
    data: User,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await removeUser(userId);

  return res.status(user ? 200 : 404).json({
    success: user ? true : false,
    message: user ? "Đã xóa người dùng thành công" : "Người dùng không tồn tại",
  });
});

// ADMIN
export const getAllUsersByAdmin = asyncHandler(async (req, res) => {
  const { username, email, role } = req.query;

  // Sử dụng biểu thức chính quy để tìm kiếm không phân biệt chữ hoa chữ thường
  const query = {};
  if (username) query.username = new RegExp(username, "i");
  if (email) query.email = new RegExp(email, "i");
  if (role) query.role = role;

  const users = await getAllUser(query);

  return res.status(users.length > 0 ? 200 : 404).json({
    success: users.length > 0,
    message:
      users.length > 0 ? "Danh sách người dùng." : "Không tìm thấy người dùng.",
    data: users,
  });
});

export const getUserDetailsByAdmin = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await getProfile(userId);
  return res.status(user ? 200 : 404).json({
    success: user ? true : false,
    message: user ? "Chi tiết người dùng." : "Không tìm thấy người dùng",
    data: user,
  });
});
