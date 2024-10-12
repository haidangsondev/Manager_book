import reservationModel from "../models/reservation.models.js";

export const createReservationService = async (userId, bookId) => {
  const response = await reservationModel.create({
    userId,
    bookId,
  });
  return response;
};

export const getUserReservationsService = async (userId) => {
  const response = await reservationModel.find({ userId }).populate("bookId");
  return response;
};

export const cancelReservationService = async (reservationId, userId) => {
  const response = await reservationModel.findOne({
    _id: reservationId,
    userId,
  });

  return response;
};

export const fulfillReservationService = async (reservationId) => {
  const response = await reservationModel.findById(reservationId);
  return response;
};
