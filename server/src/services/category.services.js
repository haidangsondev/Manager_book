import categoryModel from "../models/categories.models.js";

export const createCategoryBook = async ({ name, description }) => {
  return await categoryModel.create({ name, description });
};

export const updateCategoryBook = async (id, data) => {
  return await categoryModel.findByIdAndUpdate(id, data, { new: true });
};

export const getCategoryBook = async (query) => {
  return await categoryModel.find(query);
};

export const getCategoryBookId = async (id) => {
  return await categoryModel.findById(id);
};
export const deleteCategoryBook = async (id) => {
  return await categoryModel.findByIdAndDelete(id);
};

export const searchCategoriesBook = async (keyword) => {
  const regex = new RegExp(keyword, "i");
  const response = await categoryModel.find({
    $or: [{ name: regex }, { description: regex }],
  });
  return response;
};
