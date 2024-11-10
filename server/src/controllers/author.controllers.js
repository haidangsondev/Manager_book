import asyncHandler from "express-async-handler";
import {
  addAuthor,
  updateIsAuthor,
  deleteIsAuthor,
} from "../services/author.services.js";

export const createAuthor = asyncHandler(async (req, res) => {
  const { name, bio, nationality } = req.body;

  const newAuthor = await addAuthor({ name, bio, nationality });
  if (!newAuthor) {
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi thêm tác giả",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Tác giả mới đã được thêm thành công",
    data: newAuthor,
  });
});
export const updateAuthor = asyncHandler(async (req, res) => {
  const { authorId } = req.params;
  const updateData = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Thông tin cập nhật là bắt buộc",
    });
  }
  const updatedAuthor = await updateIsAuthor(authorId, updateData);

  if (!updatedAuthor) {
    return res.status(404).json({
      success: false,
      message: "Không tìm thấy tác giả để cập nhật",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Thông tin tác giả đã được cập nhật thành công",
    data: updatedAuthor,
  });
});
export const deleteAuthor = asyncHandler(async (req, res) => {
  const { authorId } = req.params;

  const Author = await deleteIsAuthor(authorId);

  if (!Author) {
    return res.status(404).json({
      success: false,
      message: "Không tìm thấy tác giả ",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Xóa tác giả thành công",
  });
});
