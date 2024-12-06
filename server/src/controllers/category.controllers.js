import asyncHandler from "express-async-handler";
import {
  createCategoryBook,
  deleteCategoryBook,
  getCategoryBook,
  searchCategoriesBook,
  updateCategoryBook,
} from "../services/category.services.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const category = await createCategoryBook({ name, description });
  return res.status(category ? 200 : 500).json({
    success: category ? true : false,
    message: category
      ? "Thể loại sách đã được tạo thành công"
      : "Thể loại sách tạo không thành công",
    category: category ? category : "",
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: fasle,
      message: "Thông tin cập nhật là bắt buộc",
    });
  }

  const category = await updateCategoryBook(id, data);
  return res.status(category ? 200 : 404).json({
    success: category ? true : false,
    message: category
      ? "Cập nhật thể loại sách thành công"
      : "Thể loại sách không tồn tại",
    category: category ? category : "",
  });
});

export const getCategories = asyncHandler(async (req, res) => {
  const { name } = req.query;

  const query = {};
  if (name) query.name = name;
  const categories = await getCategoryBook(query);

  return res.status(categories ? 200 : 404).json({
    success: categories ? true : false,
    message: categories
      ? "Danh sách thể loại sách"
      : "Không tìm thấy thể loại sách nào",
    categories: categories ? categories : "",
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await deleteCategoryBook(id);
  return res.status(category ? 200 : 404).json({
    success: category ? true : false,
    message: category
      ? "Thể loại không tồn tại"
      : "Thể loại đã được xóa thành công",
    category: category ? category : "",
  });
});
