import reservationModel from "../models/reservation.models.js";

export const createReservation = async (data) => {
  return await reservationModel.create(data);
};

export const getUserReservations = async (data) => {
  return await reservationModel.find(data).populate("book_id", "title author");
};
export const getUserReservationById = async (id) => {
  return await reservationModel
    .findById(id)
    .populate("book_id", "title author");
};

export const cancelReservation = async (reservation_id) => {
  return await reservationModel.findByIdAndUpdate(
    reservation_id,
    { status: "hủy" },
    { new: true }
  );
};

export const getAllReservation = async (query) => {
  return await reservationModel
    .find(query)
    .populate("user_id", "username email")
    .populate("book_id", "title author")
    .sort({ reservation_date: -1 });
};

export const deleteReservationById = async (reservationId) => {
  return await reservationModel.findByIdAndDelete(reservationId);
};

export const updateReservationByStatus = async (reservationId, status) => {
  return await reservationModel
    .findByIdAndUpdate(reservationId, { status }, { new: true })
    .populate("user_id", "username email")
    .populate("book_id", "title author");
};
