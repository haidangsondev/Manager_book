// models/reservation.model.js
import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
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
  reservation_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["chờ đợi", "hoàn thành", "hủy"],
    default: "chờ đợi",
  },
  expiry_date: {
    type: Date,
    required: true,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
