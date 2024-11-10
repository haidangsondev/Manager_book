import asyncHandler from "express-async-handler";
import {
  addBook,
  deleteBook,
  updateBook,
  getAllBooks,
  getBook,
  updateBookCopies,
} from "../services/book.services.js";
import { getCategoryBookId } from "../services/category.services.js";
import { getAuthorId } from "../services/author.services.js";

export const createBook = asyncHandler(async (req, res) => {
  const { category, author } = req.body;

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
  const newBook = await addBook(req.body);
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

  if (!updatedBook) {
    return res.status(404).json({
      success: false,
      message: "Không tìm thấy sách",
    });
  }
  res.status(200).json({
    success: true,
    message: "Cập nhật sách thành công",
    data: updatedBook,
  });
});

export const removeBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const deletedBook = await deleteBook(bookId);
  res.status(deletedBook ? 200 : 404).json({
    success: !!deletedBook,
    message: deletedBook ? "Xóa sách thành công" : "Không tìm thấy sách",
  });
});

export const getBooks = asyncHandler(async (req, res) => {
  const { title, categoryId, authorId } = req.query;

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
  const books = await getAllBooks(query);
  res.status(books.length ? 200 : 404).json({
    success: !!books.length,
    message: books.length ? "Danh sách sách" : "Không tìm thấy sách",
    data: books || [],
  });
});

export const getBookId = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const book = await getBook(bookId);
  res.status(book.length ? 200 : 404).json({
    success: !!book.length,
    message: book.length ? "Chi tiết sách" : "Không tìm thấy sách",
    data: book || [],
  });
});

export const manageBookQuantity = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { availableCopies, reservedCopies, totalCopies } = req.body;
  const updatedBook = await updateBookCopies(bookId, {
    availableCopies,
    reservedCopies,
    totalCopies,
  });
  res.status(updatedBook ? 200 : 404).json({
    success: !!updatedBook,
    message: updatedBook
      ? "Cập nhật số lượng sách thành công"
      : "Không tìm thấy sách",
    data: updatedBook || null,
  });
});
