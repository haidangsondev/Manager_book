import asyncHandler from "express-async-handler";
import {
  addBook,
  deleteBook,
  updateBook,
  getAllBooks,
  getBook,
  addReview,
  deleteReview,
  getReviewsBook,
  getReviewBook,
  deleteBookReviewById,
} from "../services/book.services.js";
import { getCategoryBookId } from "../services/category.services.js";
import { getAuthorId } from "../services/author.services.js";
import { getPublisherId } from "../services/publisher.services.js";

export const createBook = asyncHandler(async (req, res) => {
  const { category, author, publisher } = req.body;

  const checkCategory = await getCategoryBookId(category);
  if (!checkCategory) {
    return res.status(404).json({
      success: false,
      message: "Thể loại sách không tồn tại",
    });
  }
  const checkAuthor = await getAuthorId(author);
  if (!checkAuthor) {
    return res.status(404).json({
      success: false,
      message: "Tác giả không tồn tại",
    });
  }

  const checkPublisher = await getPublisherId(publisher);
  if (!checkPublisher) {
    return res.status(404).json({
      success: false,
      message: "NXB không tồn tại",
    });
  }

  const data = req.body;
  const newBook = await addBook(data);
  res.status(201).json({
    success: true,
    message: "Sách đã được thêm thành công",
    book: newBook,
  });
});

export const getBooks = asyncHandler(async (req, res) => {
  const { title, categoryId, authorId, publisherId } = req.query;
  const query = {};

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }

  if (categoryId) {
    query.category = new mongoose.Types.ObjectId(categoryId);
  }

  if (authorId) {
    query.author = new mongoose.Types.ObjectId(authorId);
  }
  if (publisherId) {
    query.author = new mongoose.Types.ObjectId(publisherId);
  }

  const books = await getAllBooks(query);
  return res.status(books ? 200 : 404).json({
    success: books ? true : false,
    message: books ? "Danh sách sách" : "Không tìm thấy sách",
    books: books ? books : [],
  });
});

export const getBookId = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  const book = await getBook(bookId);
  return res.status(book ? 200 : 404).json({
    success: book ? true : false,
    message: book ? "Chi tiết sách" : "Không tìm thấy sách",
    book: book ? book : "",
  });
});

export const editBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Thông tin cập nhật là bắt buộc",
    });
  }

  const updatedBook = await updateBook(bookId, req.body);
  return res.status(updatedBook ? 200 : 404).json({
    success: updatedBook ? true : false,
    message: updatedBook ? "Cập nhật sách thành công" : "Không tìm thấy sách",
    book: updatedBook ? updatedBook : "",
  });
});

export const removeBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const deletedBook = await deleteBook(bookId);
  return res.status(deletedBook ? 200 : 404).json({
    success: !!deletedBook,
    message: deletedBook ? "Xóa sách thành công" : "Không tìm thấy sách",
  });
});

export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const { _id } = req.user;
  const { bookId } = req.params;

  const data = { book_id: bookId, user_id: _id, rating, comment };
  const review = await addReview(data);

  return res.status(review ? 201 : 404).json({
    success: review ? true : false,
    message: review ? "Đánh giá sách thành công" : "Đánh giá không thành công",
    review: review ? review : "",
  });
});

export const removeReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const review = await deleteReview(reviewId);

  return res.status(review ? 201 : 404).json({
    success: review ? true : false,
    message: review
      ? "Xóa đánh giá thành công"
      : "Xóa đánh giá không thành công",
    review: review ? review : "",
  });
});

// LIBRARIAN
export const getBookReviews = asyncHandler(async (req, res) => {
  const reviews = await getReviewsBook({});
  return res.status(reviews ? 201 : 404).json({
    success: reviews ? true : false,
    message: reviews ? "Danh sách đánh giá" : "Không tìm thấy đánh giá",
    reviews: reviews ? reviews : "",
  });
});
export const getBookReviewById = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const review = await getReviewBook(reviewId);
  return res.status(review ? 201 : 404).json({
    success: review ? true : false,
    message: review ? "Chi tiết đánh giá" : "Không tìm thấy đánh giá",
    review: review ? review : "",
  });
});

export const deleteBookReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  const review = await deleteBookReviewById(reviewId);
  return res.status(review ? 201 : 404).json({
    success: review ? true : false,
    message: review ? "Xóa đánh giá thành công" : "Không tìm thấy đánh giá",
  });
});
