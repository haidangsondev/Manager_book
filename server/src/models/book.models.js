import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 256,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    publisher: {
      type: String,
      trim: true,
    },
    year_published: {
      type: Number,
      min: 0,
    },
    total_copies: {
      type: Number,
      required: true,
      min: 0,
    },
    available_copies: {
      type: Number,
      required: true,
      min: 0,
    },
    reserved_copies: {
      type: Number,
      default: 0,
      min: 0,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 256,
    },
    status: {
      type: String,
      enum: ["có sẵn", "đã mượng", "đặt trước", "mất", "bị hỏng"],
      default: "có sẵn",
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
