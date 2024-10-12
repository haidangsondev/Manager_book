import mongoose from "mongoose";
import validator from "validator";
import crypto from "crypto";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 15,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    phone: {
      type: String,
      minlength: 10,
    },
    borrowedBooks: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "BorrowRecord",
        }, // Tham chiếu đến sách đang mượn
        borrowedDate: Date, // Ngày mượn sách
        dueDate: Date, // Ngày trả sách
        returnedDate: Date, // Ngày trả sách (nếu đã trả)
      },
    ],
    reservedBooks: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Reservation",
        },
        reservedDate: Date, // Ngày đặt trước
      },
    ],
    emailToken: {
      type: String,
      default: null,
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },

    avatar: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
    passwordChangeAt: {
      type: String,
      default: "",
    },
    passwordResetExpires: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user", // Mặc định người dùng thường
    },
  },
  { timestamps: true }
);
userSchema.methods = {
  createPasswordToken: async function () {
    const passwordToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(passwordToken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    return passwordToken;
  },
};
const User = mongoose.model("User", userSchema);

export default User;
