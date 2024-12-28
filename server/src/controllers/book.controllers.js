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
import { getProfile } from "../services/user.services.js";

export const getBooks = asyncHandler(async (req, res) => {
  const { search } = req.query;

  let queryObject = {};
  if (req.query.search) {
    // Cập nhật đối tượng truy vấn với điều kiện tìm kiếm là tiêu đề
    queryObject = {
      $or: [{ title: { $regex: req.query.search, $options: "i" } }],
    };
  }

  const books = await getAllBooks(queryObject);

  return res.status(books.length > 0 ? 200 : 404).json({
    success: books.length > 0 ? true : false,
    message: books.length > 0 ? "Danh sách sách" : "Không tìm thấy sách",
    data: books,
  });
});

export const getBookId = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  const book = await getBook(bookId);
  return res.status(book ? 200 : 404).json({
    success: book ? true : false,
    message: book ? "Chi tiết sách" : "Không tìm thấy sách",
    data: book,
  });
});

export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const { _id } = req.user;
  const { bookId } = req.params;

  const data = { book_id: bookId, user_id: _id, rating, comment };
  const review = await addReview(data);

  return res.status(review ? 201 : 500).json({
    success: review ? true : false,
    message: review
      ? "Đánh giá sách thành công"
      : "Có xảy rã lỗi hệ thống khi đánh giá sách",
  });
});

export const removeReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { _id } = req.user;

  const user = await getProfile(_id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Bạn không có quyèn xóa",
    });
  }
  const review = await deleteReview(reviewId);

  return res.status(review ? 201 : 500).json({
    success: review ? true : false,
    message: review
      ? "Xóa đánh giá thành công"
      : "Có xảy rã lỗi hệ thống khi xóa đánh giá sách",
  });
});

// LIBRARIAN

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
    data: newBook,
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
    success: deletedBook ? true : false,
    message: deletedBook ? "Xóa sách thành công" : "Không tìm thấy sách",
  });
});

export const getBookReviews = asyncHandler(async (req, res) => {
  const reviews = await getReviewsBook();
  console.log(reviews);
  return res.status(reviews ? 200 : 404).json({
    success: reviews ? true : false,
    message: reviews ? "Danh sách đánh giá" : "Không tìm thấy đánh giá",
    data: reviews,
  });
});

export const getBookReviewById = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const review = await getReviewBook(reviewId);
  return res.status(review ? 200 : 404).json({
    success: review ? true : false,
    message: review ? "Chi tiết đánh giá" : "Không tìm thấy đánh giá",
    data: review,
  });
});

export const deleteBookReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  const review = await deleteBookReviewById(reviewId);
  return res.status(review ? 200 : 404).json({
    success: review ? true : false,
    message: review ? "Xóa đánh giá thành công" : "Không tìm thấy đánh giá",
  });
});
