import asyncHandler from "express-async-handler";
import { getBook } from "../services/book.services.js";
import {
  addReversationBook,
  removeReversationBook,
} from "../services/user.services.js";
import {
  createReservation,
  getUserReservations,
  getUserReservationById,
  cancelReservation,
  getAllReservation,
  deleteReservationById,
  updateReservationByStatus,
} from "../services/reservation.services.js";

export const reserveBook = asyncHandler(async (req, res) => {
  const { book_id } = req.body;
  const { _id } = req.user;

  const book = await getBook(book_id);
  if (!book || book.available_copies <= 0) {
    return res
      .status(400)
      .json({ success: false, message: "Sách không khả dụng." });
  }

  const expiry_date = new Date();
  expiry_date.setDate(expiry_date.getDate() + 3);

  const data = { user_id: _id, book_id, expiry_date };
  const reservation = await createReservation(data);
  if (!reservation) {
    return res.status(500).json({
      success: false,
      message: "Đặt sách không thành công.",
    });
  }

  book.reserved_copies += 1;
  book.available_copies -= 1;
  await book.save();

  await addReversationBook(_id, reservation._id);
  return res.status(200).json({
    success: true,
    message: "Đặt sách trước thành công.",
    reservation,
  });
});

export const getReservations = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const data = { user_id: _id };

  const reservations = await getUserReservations(data);
  return res.status(reservations ? 200 : 404).json({
    success: reservations ? true : false,
    message: reservations
      ? "Danh sách sách đã đặt trước."
      : "Không tìm thấy danh sách đặt trước.",
    reservations,
  });
});

export const cancelBookReservation = asyncHandler(async (req, res) => {
  const { reservationId } = req.params;
  const { _id } = req.user;

  const reservation = await getUserReservationById(reservationId);
  if (!reservation) {
    return res.status(404).json({
      success: false,
      message: "Không tìm thấy yêu cầu đặt trước.",
    });
  }

  const now = new Date();
  const reservationExpiryDate = new Date(reservation.expiry_date).getDate();
  if (now.getDate() > reservationExpiryDate) {
    return res.status(400).json({
      success: false,
      message: "Không thể hủy vì yêu cầu đã vượt hạn 3 ngày.",
    });
  }

  const book = await getBook(reservation.book_id);
  book.reserved_copies -= 1;
  book.available_copies += 1;
  await book.save();
  await removeReversationBook(_id, reservation._id);

  await cancelReservation(reservationId);
  return res.status(200).json({
    success: true,
    message: "Hủy yêu cầu đặt trước thành công.",
  });
});

export const getAllReservations = asyncHandler(async (req, res) => {
  const { status } = req.query;

  const query = {};
  if (status) query.status = status;

  const reservations = await getAllReservation(query);
  return res.status(reservations ? 200 : 404).json({
    success: reservations ? true : false,
    message: reservations
      ? "Danh sách yêu cầu đặt trước."
      : "Yêu cầu đặt trước không tìm thấy",
    reservations: reservations ? reservations : "",
  });
});

export const getReservationDetails = asyncHandler(async (req, res) => {
  const { reservationId } = req.params;

  const reservation = await getUserReservationById(reservationId);
  return res.status(reservation ? 200 : 404).json({
    success: reservation ? true : false,
    message: reservation
      ? "Chi tiết yêu cầu đặt trước."
      : "Yêu cầu đặt trước không tìm thấy",
    reservation,
  });
});

export const deleteReservation = asyncHandler(async (req, res) => {
  const { reservationId } = req.params;

  const reservation = await deleteReservationById(reservationId);
  return res.status(reservation ? 200 : 404).json({
    success: reservation ? true : false,
    message: reservation
      ? "Xóa yêu cầu đặt trước thành công."
      : "Yêu cầu đặt trước không tìm thấy.",
  });
});

export const updateReservationStatus = asyncHandler(async (req, res) => {
  const { reservationId } = req.params;
  const { status } = req.body;

  const validStatuses = ["chờ đợi", "hoàn thành", "hủy"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Trạng thái không hợp lệ.",
    });
  }

  const isReservation = await getUserReservationById(reservationId);
  if (status == "hủy") {
    const book = await getBook(isReservation.book_id);
    book.reserved_copies -= 1;
    book.available_copies += 1;
    await book.save();
    await removeReversationBook(isReservation.user_id, isReservation._id);
  }

  const reservation = await updateReservationByStatus(reservationId, status);

  return res.status(reservation ? 200 : 404).json({
    success: reservation ? true : false,
    message: reservation
      ? "Cập nhật trạng thái thành công."
      : "Yêu cầu đặt trước không tìm thấy",
    reservation,
  });
});
