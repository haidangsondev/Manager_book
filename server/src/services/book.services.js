import bookModel from "../models/book.models.js";
import reviewModel from "../models/review.models.js";

export const getAllBooks = async (query) => {
  return await bookModel
    .find(query)
    .populate("category", "name")
    .populate("author", "name")
    .populate("publisher", "name");
};

export const getBook = async (bookId) => {
  return await bookModel
    .findById(bookId)
    .populate("category", "name")
    .populate("author", "name")
    .populate("publisher", "name");
};

export const addBook = async (data) => {
  return await bookModel.create(data);
};
export const updateBook = async (bookId, data) => {
  return await bookModel.findByIdAndUpdate(bookId, data, { new: true });
};
export const deleteBook = async (bookId) => {
  return await bookModel.findByIdAndDelete(bookId);
};

export const addReview = async (data) => {
  return await reviewModel.create(data);
};

export const deleteReview = async (reviewId) => {
  return await reviewModel.findByIdAndDelete(reviewId);
};

export const getReviewsBook = async ({}) => {
  return await reviewModel.find({});
};

export const getReviewBook = async (reviewId) => {
  return await reviewModel.findById(reviewId);
};

export const deleteBookReviewById = async (id) => {
  return await reviewModel.findByIdAndDelete(id);
};
