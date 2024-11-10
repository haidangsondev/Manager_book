import bookModel from "../models/book.models.js";

export const addBook = async (bookData) => {
  return await bookModel.create(bookData);
};
export const updateBook = async (bookId, data) => {
  return await bookModel.findByIdAndUpdate(bookId, data, { new: true });
};
export const deleteBook = async (bookId) => {
  return await bookModel.findByIdAndDelete(bookId);
};

export const getAllBooks = async (query) => {
  return await bookModel
    .find(query)
    .populate("category", "name")
    .populate("author", "name");
};

export const getBook = async (bookId) => {
  return await bookModel.findById(bookId);
};

export const updateBookCopies = async (
  bookId,
  { availableCopies, reservedCopies, totalCopies }
) => {
  return await bookModel.findByIdAndUpdate(
    bookId,
    {
      available_copies: availableCopies,
      reserved_copies: reservedCopies,
      total_copies: totalCopies,
    },
    { new: true }
  );
};
