import asyncHandler from "express-async-handler";
import { getBook } from "../services/book.services.js";
import {
  addReversationBook,
  removeReversationBook,
} from "../services/user.services.js";
import {
  createReservation,
  getUserReservations,
  cancelReservation,
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

  const reservation = await createReservation(_id, book_id, expiry_date);
  if (!reservation) {
    return res.status(500).json({
      success: false,
      message: "Đặt sách thất bại.",
    });
  }

  book.reserved_copies += 1;
  await book.save();

  await addReversationBook(_id, reservation._id);
  return res.status(200).json({
    success: true,
    message: "Đặt sách trước thành công.",
    data: reservation,
  });
});

export const getReservations = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const reservations = await getUserReservations(_id);
  if (!reservations) {
    return res.status(404).json({
      success: false,
      message: "Không tìm thấy danh sách đặt trước.",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Danh sách sách đã đặt trước.",
    data: reservations,
  });
});
export const cancelBookReservation = asyncHandler(async (req, res) => {
  const { reservation_id } = req.params;
  const { _id } = req.user;

  const reservation = await cancelReservation(reservation_id);

  if (!reservation) {
    return res.status(404).json({
      success: false,
      message: "Không tìm thấy yêu cầu đặt trước.",
    });
  }
  const book = await getBook(reservation.book_id);
  book.reserved_copies -= 1;
  await book.save();
  await removeReversationBook(_id, reservation._id);

  return res.status(200).json({
    success: true,
    message: "Hủy yêu cầu đặt trước thành công.",
    data: reservation,
  });
});
