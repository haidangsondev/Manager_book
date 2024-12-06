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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publisher",
      required: true,
    },
    year_published: {
      type: Number,
      min: 0,
      validate: {
        validator: function (value) {
          return value <= new Date().getFullYear();
        },
        message: "Năm xuất bản không được vượt quá năm hiện tại.",
      },
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
      validate: {
        validator: function (value) {
          return value + this.reserved_copies <= this.total_copies;
        },
        message:
          "Số lượng có sẵn và đặt trước không được vượt quá tổng số bản sao.",
      },
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
      enum: ["có sẵn", "đã mượn", "đặt trước", "mất", "bị hỏng"],
      default: "có sẵn",
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
