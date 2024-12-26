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

export const cancelReservation = async (id) => {
  return await reservationModel.findByIdAndUpdate(
    id,
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

export const deleteReservationById = async (id) => {
  return await reservationModel.findByIdAndDelete(id);
};

export const updateReservationByStatus = async (id, status) => {
  return await reservationModel
    .findByIdAndUpdate(id, { status }, { new: true })
    .populate("user_id", "username email")
    .populate("book_id", "title author");
};
