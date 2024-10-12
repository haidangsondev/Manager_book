import asyncHandler from "express-async-handler";
import {
  cancelReservationService,
  createReservationService,
  fulfillReservationService,
  getUserReservationsService,
} from "../services/reservation.services.js";
import { borrowBookService } from "../services/book.services.js";

export const createReservation = asyncHandler(async (req, res) => {
  const { bookId } = req.body;
  const { _id: userId } = req.user;
  const reservation = await createReservationService(userId, bookId);

  if (!reservation) {
    throw new error("Đặt trước không thành công");
  }
  res.status(201).json({
    success: true,
    message: "Đặt trước thành công.",
    data: reservation,
  });
});

export const getUserReservations = asyncHandler(async (req, res) => {
  const { _id: userId } = req.user;
  const reservations = await getUserReservationsService(userId);
  if (!reservations) {
    throw new error("Người dùng không tồn tại");
  }
  res.status(200).json({
    success: true,
    message: "Cuốn sách người dùng đã đăng ký đặt",
    data: reservations,
  });
});

export const cancelReservation = asyncHandler(async (req, res) => {
  const { reservationId } = req.params;
  const { _id: userId } = req.user;

  const reservation = await cancelReservationService(reservationId, userId);
  if (!reservation) {
    throw new error("Người dùng không tồn tại");
  }

  reservation.status = "Hủy";
  await reservation.save();

  res.status(200).json({
    success: true,
    message: "Cuốn sách đặt trước đã bị hủy.",
    data: reservation,
  });
});

export const fulfillReservation = asyncHandler(async (req, res) => {
  const { reservationId } = req.params;

  const reservation = await fulfillReservationService(reservationId);
  if (!reservation) {
    throw new error("Cuốn sách đặt trước không tồn tại");
  }

  reservation.status = "Xác nhận";
  await reservation.save();

  const { bookId, userId, ...data } = reservation;
  const book = await borrowBookService(bookId);

  book.status = "Đã mượn";
  book.borrowedBy = userId;
  book.borrowedDate = new Date();
  book.dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await book.save();

  res.status(200).json({
    success: true,
    message: "Trạng thái đặt trước đã được cập nhật.",
    data: reservation,
  });
});
