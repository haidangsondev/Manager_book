import authorModel from "../models/authors.models.js";

export const getAuthorId = async (id) => {
  return await authorModel.findById(id);
};

export const addAuthor = async (data) => {
  return await authorModel.create(data);
};
export const getAllAuthor = async (query) => {
  return await authorModel.find(query);
};
export const updateIsAuthor = async (_id, updateData) => {
  return await authorModel.findByIdAndUpdate(_id, updateData, { new: true });
};
export const deleteIsAuthor = async (authorId) => {
  return await authorModel.findByIdAndDelete(authorId);
};
