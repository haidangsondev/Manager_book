import bookModel from "../models/book.models.js";
import reviewModel from "../models/review.models.js";

export const getAllBooks = async (query) => {
  return await bookModel
    .find(query)
    .populate("category", "name")
    .populate("author", "name")
    .populate("publisher", "name");
};

export const getBook = async (id) => {
  return await bookModel
    .findById(id)
    .populate("category", "name")
    .populate("author", "name")
    .populate("publisher", "name");
};

export const addBook = async (data) => {
  return await bookModel.create(data);
};
export const updateBook = async (id, data) => {
  return await bookModel.findByIdAndUpdate(id, data, { new: true });
};
export const deleteBook = async (id) => {
  return await bookModel.findByIdAndDelete(id);
};

export const addReview = async (data) => {
  return await reviewModel.create(data);
};

export const deleteReview = async (id) => {
  return await reviewModel.findByIdAndDelete(id);
};

export const getReviewsBook = async () => {
  return await reviewModel.find({});
};

export const getReviewBook = async (id) => {
  return await reviewModel.findById(id);
};

export const deleteBookReviewById = async (id) => {
  return await reviewModel.findByIdAndDelete(id);
};
