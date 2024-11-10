import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    nationality: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);

export default Author;
