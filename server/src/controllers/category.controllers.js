import asyncHandler from "express-async-handler";
import {
  createCategoryBook,
  deleteCategoryBook,
  getCategoryBook,
  updateCategoryBook,
} from "../services/category.services.js";

export const createCategory = asyncHandler(async (req, res) => {
  const data = req.body;

  const category = await createCategoryBook(data);
  return res.status(category ? 201 : 500).json({
    success: category ? true : false,
    message: category
      ? "Thể loại sách đã được tạo thành công"
      : "Có xảy ra lỗi hệ thống khi thêm thể loại sách",
    data: category,
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const data = req.body;

  // Kiểm tra dữ liệu trống
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Thông tin cập nhật là bắt buộc",
    });
  }

  const category = await updateCategoryBook(categoryId, data);
  return res.status(category ? 200 : 500).json({
    success: category ? true : false,
    message: category
      ? "Cập nhật thể loại sách thành công"
      : "Có xảy ra lỗi hệ thống khi cập nhật thông tin",
    data: category,
  });
});

export const getCategories = asyncHandler(async (req, res) => {
  const { name } = req.query;

  // Sử dụng biểu thức chính quy để tìm kiếm không phân biệt chữ hoa chữ thường
  const query = {};
  if (name) query.name = { $regex: new RegExp(name, "i") };
  const categories = await getCategoryBook(query);

  return res.status(categories.length > 0 ? 200 : 404).json({
    success: categories.length > 0 ? true : false,
    message:
      categories.length > 0
        ? "Danh sách thể loại sách"
        : "Không tìm thấy thể loại sách nào",
    data: categories,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const category = await deleteCategoryBook(categoryId);
  return res.status(category ? 200 : 404).json({
    success: category ? true : false,
    message: category
      ? "Thể loại đã được xóa thành công"
      : "Thể loại không tồn tại",
  });
});
