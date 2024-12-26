import asyncHandler from "express-async-handler";
import {
  addPublisher,
  updateIsPublisher,
  getAllPublisher,
  deleteIsPublisher,
} from "../services/publisher.services.js";

export const createPublisher = asyncHandler(async (req, res) => {
  const data = req.body;

  const publisher = await addPublisher(data);
  return res.status(publisher ? 201 : 500).json({
    success: publisher ? true : false,
    message: publisher
      ? `NXB đã được thêm thành công`
      : "Có xảy ra lỗi hệ thống khi thêm NXB",
    data: publisher,
  });
});

export const getPublishers = asyncHandler(async (req, res, next) => {
  const { name } = req.query;

  // Sử dụng biểu thức chính quy để tìm kiếm không phân biệt chữ hoa chữ thường
  const query = {};
  if (name) query.name = { $regex: new RegExp(name, "i") };
  const publisher = await getAllPublisher(query);

  return res.status(publisher.length > 0 ? 200 : 404).json({
    success: publisher.length > 0 ? true : false,
    message: publisher.length > 0 ? "Danh sách NXB" : "Không tìm thấy NXB",
    data: publisher,
  });
});

export const updatePublisher = asyncHandler(async (req, res) => {
  const { publisherId } = req.params;
  const updateData = req.body;

  //  Kiểm tra dữ liệu trống
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Thông tin cập nhật là bắt buộc",
    });
  }
  const publisher = await updateIsPublisher(publisherId, updateData);

  return res.status(publisher ? 200 : 404).json({
    success: publisher ? true : false,
    message: publisher
      ? "Thông tin NXB đã được cập nhật thành công"
      : "Có xảy ra lỗi hệ thống khi cập nhật thông tin",
    data: publisher,
  });
});

export const deletePublisher = asyncHandler(async (req, res) => {
  const { publisherId } = req.params;

  const publisher = await deleteIsPublisher(publisherId);
  return res.status(publisher ? 200 : 404).json({
    success: publisher ? true : false,
    message: publisher ? "Xóa NXB thành công" : "Không tìm thấy NXB",
  });
});
