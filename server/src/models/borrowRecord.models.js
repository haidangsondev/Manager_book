import mongoose from "mongoose";

const borrowRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowedDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnedDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const BorrowRecord = mongoose.model("BorrowRecord", borrowRecordSchema);

export default BorrowRecord;
