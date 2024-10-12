import categoryModel from "../models/categories.models.js";

export const createCategoryBook = async ({ name, description }) => {
  const response = await categoryModel.create({ name, description });

  return response;
};
export const updateCategoryBook = async ({ id, name, description }) => {
  const response = await categoryModel.findByIdAndUpdate(
    id,
    { name, description },
    { new: true }
  );
  return response;
};
export const getCategoryBook = async () => {
  const response = await categoryModel.find({});
  return response;
};
export const getCategoryBookId = async (id) => {
  const response = await categoryModel.findById(id);
  return response;
};
export const deleteCategoryBook = async (id) => {
  const response = await categoryModel.findByIdAndDelete(id);
  return response;
};

export const searchCategoriesBook = async (keyword) => {
  const regex = new RegExp(keyword, "i");
  const response = await categoryModel.find({
    $or: [{ name: regex }, { description: regex }],
  });
  return response;
};
