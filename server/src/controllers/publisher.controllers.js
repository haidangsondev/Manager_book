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
  return res.status(publisher ? 200 : 500).json({
    success: publisher ? true : false,
    message: publisher
      ? `NXB đã được thêm thành công`
      : "Đã xảy ra lỗi khi thêm NXB",
    publisher: publisher ? publisher : "",
  });
});

export const getPublishers = asyncHandler(async (req, res, next) => {
  const { name } = req.query;

  const query = {};
  if (name) query.name = name;
  const publisher = await getAllPublisher(query);

  return res.status(publisher ? 200 : 404).json({
    success: publisher ? true : false,
    message: publisher ? "Danh sách NXB" : "Không tìm thấy NXB",
    publisher: publisher ? publisher : "",
  });
});

export const updatePublisher = asyncHandler(async (req, res) => {
  const { publisherId } = req.params;
  const updateData = req.body;

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
      : "Không tìm thấy NXB để cập nhật",
    publisher: publisher ? publisher : "",
  });
});

export const deletePublisher = asyncHandler(async (req, res) => {
  const { publisherId } = req.params;

  const publisher = await deleteIsPublisher(publisherId);
  return res.status(publisher ? 200 : 404).json({
    success: publisher ? true : false,
    message: publisher ? "Xóa NXB thành công" : "Không tìm thấy NXB",
    publisher: publisher ? publisher : "",
  });
});
