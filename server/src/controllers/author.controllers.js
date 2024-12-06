import asyncHandler from "express-async-handler";
import {
  addAuthor,
  updateIsAuthor,
  deleteIsAuthor,
  getAllAuthor,
} from "../services/author.services.js";

export const createAuthor = asyncHandler(async (req, res) => {
  const data = req.body;

  const newAuthor = await addAuthor(data);
  return res.status(newAuthor ? 200 : 500).json({
    success: newAuthor ? true : false,
    message: newAuthor
      ? `Tác giả mới đã được thêm thành công`
      : "Đã xảy ra lỗi khi thêm tác giả",
    newAuthor: newAuthor ? newAuthor : "",
  });
});

export const getAuthors = asyncHandler(async (req, res, next) => {
  const { name, nationality } = req.query;

  const query = {};
  if (name) query.name = name;
  if (nationality) query.nationality = nationality;
  const Author = await getAllAuthor(query);

  return res.status(Author ? 200 : 404).json({
    success: Author ? true : false,
    message: Author ? "Danh sách tác giả" : "Không tìm thấy tác giả",
    author: Author ? Author : "",
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

  return res.status(updatedAuthor ? 200 : 404).json({
    success: updatedAuthor ? true : false,
    message: updatedAuthor
      ? "Thông tin tác giả đã được cập nhật thành công"
      : "Không tìm thấy tác giả để cập nhật",
    author: updatedAuthor ? updatedAuthor : "",
  });
});

export const deleteAuthor = asyncHandler(async (req, res) => {
  const { authorId } = req.params;

  const Author = await deleteIsAuthor(authorId);
  return res.status(Author ? 200 : 404).json({
    success: Author ? true : false,
    message: Author ? "Xóa tác giả thành công" : "Không tìm thấy tác giả",
    author: Author ? Author : "",
  });
});
