import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowed_date: {
      type: Date,
      default: Date.now,
    },
    due_date: {
      type: Date,
      required: true,
    },
    return_date: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["mượn", "đã trả", "trể hạn"],
      default: "mượn",
    },
    fine: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
