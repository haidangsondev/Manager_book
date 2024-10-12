import asyncHandler from "express-async-handler";
import {
  borrowBookService,
  createBookService,
  deleteBookService,
  getBookByIdService,
  getBooksService,
  getBorrowRecordbook,
  searchBooksService,
  updateBookService,
} from "../services/book.services.js";
import { getCategoryBookId } from "../services/category.services.js";
import {
  borrowRecordbook,
  updateBorrowRecordbook,
} from "../services/borrowRecord.services.js";

export const createBook = asyncHandler(async (req, res) => {
  const { category: id } = req.body;

  const checkCategory = await getCategoryBookId(id);
  if (!checkCategory) {
    return res.status(404).json({
      success: false,
      message: "Thể loại sách không tồn tại",
    });
  }

  const newBook = await createBookService(req.body);
  if (!newBook) {
    return res.status(500).json({
      success: false,
      message: "Sách tạo không thành công.",
    });
  }
  res.status(201).json({
    success: true,
    data: newBook,
    message: "Sách đã được tạo thành công.",
  });
});

export const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const bookData = req.body;

  const updatedBook = await updateBookService(id, bookData);
  if (!updatedBook) {
    return res.status(404).json({
      success: false,
      message: "Sách không tồn tại.",
    });
  }
  res.status(200).json({
    success: true,
    message: "Cập nhật sách thành công.",
    data: updatedBook,
  });
});

export const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await deleteBookService(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Sách không tồn tại.",
    });
  }
  res.status(200).json({
    success: true,
    message: "Sách đã được xóa thành công.",
  });
});

export const getBooks = asyncHandler(async (req, res) => {
  const books = await getBooksService();

  if (!books) {
    return res.status(404).json({
      success: false,
      message: "Sách không tồn tại.",
    });
  }
  res.status(200).json({
    success: true,
    message: "Danh sách các loại sách",
    data: books,
  });
});

export const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await getBookByIdService(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Sách không tồn tại.",
    });
  }
  res.status(200).json({
    success: true,
    message: "Chi tiết cuốn sách",
    data: book,
  });
});

export const searchBooks = asyncHandler(async (req, res) => {
  const { keyword } = req.query;
  const books = await searchBooksService(keyword);

  if (!books) {
    return res.status(404).json({
      success: false,
      message: "Sách không tồn tại.",
    });
  }

  res.status(200).json({
    success: true,
    message: "Danh sách sách đã tìm kiếm",
    data: books,
  });
});

export const borrowBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const book = await borrowBookService(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Sách không tồn tại.",
    });
  }

  if (book.status !== "Có sẵn") {
    throw new Error("Sách không thể mượn.");
  }

  book.status = "Đã mượn";
  book.borrowedBy = userId;
  book.borrowedDate = new Date();
  book.dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await book.save();

  await borrowRecordbook({
    userId,
    bookId: id,
    borrowedDate: new Date(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  res.status(200).json({
    success: true,
    data: book,
    message: "Sách đã được mượn.",
  });
});

export const returnBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const book = await borrowBookService(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Sách không tồn tại.",
    });
  }
  if (book.status !== "Đã mượn") {
    throw new Error("Sách không thể trả.");
  }

  book.status = "Có sẵn";
  book.borrowedBy = null;
  book.borrowedDate = null;
  book.dueDate = null;

  await book.save();

  await updateBorrowRecordbook({
    userId,
    bookId: id,
    returnedDate: new Date(),
  });

  res.status(200).json({
    success: true,
    message: "Sách đã được trả.",
    data: book,
  });
});

export const reviewBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: reviewerId } = req.user;
  const { rating, comment } = req.body;

  const book = await borrowBookService(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Sách không tồn tại.",
    });
  }

  const existingReviewIndex = book.reviews.findIndex(
    (review) => review.reviewerId.toString() === reviewerId.toString()
  );

  if (existingReviewIndex !== -1) {
    book.reviews[existingReviewIndex].rating = rating;
    book.reviews[existingReviewIndex].comment = comment;
  } else {
    const reviewData = { reviewerId, rating, comment };
    book.reviews.push(reviewData);
  }

  const totalRating = book.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  book.totalRatings = totalRating / book.reviews.length;

  await book.save();

  res.status(200).json({
    success: true,
    message: "Đánh giá cuốn sách thành công.",
    data: book,
  });
});

export const getBorrowBook = asyncHandler(async (req, res) => {
  const { _id: borrowedBy } = req.user;

  const bookBorrow = await getBorrowRecordbook(borrowedBy);
  if (!bookBorrow) {
    return res.status(404).json({
      success: false,
      message: "Sách không tồn tại.",
    });
  }

  res.status(200).json({
    success: true,
    message: "Danh sách cuốn sách đã mượn",
    data: bookBorrow,
  });
});
