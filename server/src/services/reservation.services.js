import reservationModel from "../models/reservation.models.js";

export const createReservation = async (_id, bookId, expiryDate) => {
  return await reservationModel.create({
    user_id: _id,
    book_id: bookId,
    expiry_date: expiryDate,
  });
};

export const getUserReservations = async (_id) => {
  return await reservationModel
    .find({ user_id: _id })
    .populate("book_id", "title author");
};

export const cancelReservation = async (reservation_id) => {
  return await reservationModel.findByIdAndUpdate(
    reservation_id,
    { status: "hủy" },
    { new: true }
  );
};
