import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 5,
      maxlength: 100,
    },
    address: {
      type: String,
      trim: true,
      maxlength: 255,
    },
  },
  { timestamps: true }
);

const Publisher = mongoose.model("Publisher", publisherSchema);

export default Publisher;
