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
  return res.status(newAuthor ? 201 : 500).json({
    success: newAuthor ? true : false,
    message: newAuthor
      ? `Tác giả mới đã được thêm thành công`
      : "Có xảy ra lỗi hệ thống khi thêm tác giả",
    data: newAuthor,
  });
});

export const getAuthors = asyncHandler(async (req, res, next) => {
  const { name, nationality } = req.query;

  // Sử dụng biểu thức chính quy để tìm kiếm không phân biệt chữ hoa chữ thường
  const query = {};
  if (name) query.name = { $regex: new RegExp(name, "i") };
  if (nationality) query.nationality = { $regex: new RegExp(nationality, "i") };
  const Author = await getAllAuthor(query);

  return res.status(Author.length > 0 ? 200 : 404).json({
    success: Author.length > 0 ? true : false,
    message: Author.length > 0 ? "Danh sách tác giả" : "Không tìm thấy tác giả",
    data: Author,
  });
});

export const updateAuthor = asyncHandler(async (req, res) => {
  const { authorId } = req.params;
  const updateData = req.body;

  // Kiểm tra dữ liệu trống
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Thông tin cập nhật là bắt buộc",
    });
  }
  const updatedAuthor = await updateIsAuthor(authorId, updateData);

  return res.status(updatedAuthor ? 200 : 500).json({
    success: updatedAuthor ? true : false,
    message: updatedAuthor
      ? "Thông tin tác giả đã được cập nhật thành công"
      : "Có xảy ra lỗi hệ thống khi cập nhật thông tin",
    data: updatedAuthor,
  });
});

export const deleteAuthor = asyncHandler(async (req, res) => {
  const { authorId } = req.params;

  const Author = await deleteIsAuthor(authorId);
  return res.status(Author ? 200 : 404).json({
    success: Author ? true : false,
    message: Author ? "Xóa tác giả thành công" : "Không tìm thấy tác giả",
  });
});
