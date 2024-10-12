import bookModel from "../models/book.models.js";

export const createBookService = async (data) => {
  const response = await bookModel.create(data);
  return response;
};

export const updateBookService = async (id, data) => {
  const response = await bookModel.findByIdAndUpdate(id, data, { new: true });

  return response;
};

export const deleteBookService = async (id) => {
  const response = await bookModel.findByIdAndDelete(id);
  return response;
};

export const getBooksService = async () => {
  const response = await bookModel.find({});
  return response;
};

export const getBookByIdService = async (id) => {
  const response = await bookModel.findById(id);

  return response;
};

export const searchBooksService = async (keyword) => {
  const regex = new RegExp(keyword, "i");
  const response = await bookModel.find({
    $or: [{ title: regex }, { author: regex }],
  });
  return response;
};

export const borrowBookService = async (id) => {
  const response = await bookModel.findById(id);
  return response;
};

export const getBorrowRecordbook = async (borrowedBy) => {
  const response = await bookModel.find({ borrowedBy });
  return response;
};
