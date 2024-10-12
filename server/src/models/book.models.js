import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    publisher: {
      type: String,
      required: true,
      maxlength: 100,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Có sẵn", "Đã mượn", "Đã đặt trước"],
      default: "Có sẵn",
    },
    borrowedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    borrowedDate: {
      type: Date,
      default: null,
    },
    dueDate: {
      type: Date,
      default: null,
    },

    totalRatings: {
      type: Number,
    },
    reviews: [
      {
        reviewerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          maxlength: 1000,
        },
      },
    ],
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
