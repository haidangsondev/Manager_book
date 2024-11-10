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
  if (!category) {
    return res.status(500).json({
      success: false,
      message: "Thể loại sách tạo không thành công",
    });
  }
  res.status(201).json({
    success: true,
    message: "Thể loại sách đã được tạo thành công",
    category,
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const category = await updateCategoryBook({ id, name, description });

  if (!category) {
    res.status(404);
    throw new Error("Thể loại sách không tồn tại");
  }

  res.status(200).json({
    success: true,
    message: "Cập nhật thể loại sách thành công",
    data: category,
  });
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await getCategoryBook();
  if (!categories) {
    return res.status(404).json({
      success: true,
      message: "Không tìm thấy thể loại sách nào",
    });
  }
  res.status(200).json({
    success: true,
    message: "Danh sách thể loại sách",
    data: categories,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await deleteCategoryBook(id);

  if (!category) {
    res.status(404);
    throw new Error("Thể loại không tồn tại");
  }

  res.status(200).json({
    success: true,
    message: "Thể loại đã được xóa thành công",
  });
});
