import Joi from "joi";

// Định nghĩa cấu trúc của book
const bookFields = {
  title: Joi.string().min(3).max(256).required().messages({
    "any.required": "Tiêu đề sách là bắt buộc.",
    "string.min": "Tiêu đề sách phải có ít nhất 3 ký tự.",
    "string.max": "Tiêu đề sách không được vượt quá 256 ký tự.",
  }),
  author: Joi.string().required().messages({
    "any.required": "Tên tác giả là bắt buộc.",
  }),
  category: Joi.string().required().messages({
    "any.required": "Thể loại sách là bắt buộc.",
  }),
  isbn: Joi.string().required().messages({
    "any.required": "Mã ISBN là bắt buộc.",
  }),
  publisher: Joi.string().optional().messages({
    "string.base": "Nhà xuất bản phải là chuỗi ký tự.",
  }),
  year_published: Joi.number().integer().min(0).optional().messages({
    "number.base": "Năm xuất bản phải là một số nguyên.",
    "number.min": "Năm xuất bản không thể nhỏ hơn 0.",
  }),
  total_copies: Joi.number().integer().min(0).required().messages({
    "any.required": "Tổng số lượng sách là bắt buộc.",
    "number.base": "Tổng số lượng sách phải là số nguyên.",
    "number.min": "Tổng số lượng sách không thể nhỏ hơn 0.",
  }),
  available_copies: Joi.number().integer().min(0).required().messages({
    "any.required": "Số lượng sách có sẵn là bắt buộc.",
    "number.base": "Số lượng sách có sẵn phải là số nguyên.",
    "number.min": "Số lượng sách có sẵn không thể nhỏ hơn 0.",
  }),
  reserved_copies: Joi.number().integer().min(0).default(0).messages({
    "number.base": "Số lượng sách đặt trước phải là số nguyên.",
    "number.min": "Số lượng sách đặt trước không thể nhỏ hơn 0.",
  }),
  location: Joi.string().optional().max(256).messages({
    "string.base": "Vị trí phải là chuỗi ký tự.",
    "string.max": "Vị trí không được vượt quá 256 ký tự.",
  }),
  status: Joi.string()
    .valid("available", "checked out", "reserved", "lost", "damaged")
    .default("available")
    .messages({
      "any.only":
        "Trạng thái sách phải là một trong các giá trị: available, checked out, reserved, lost, hoặc damaged.",
    }),
};

// Lấy schema kiểm tra dựa trên kiểu (ở đây là book)
const getValidationSchema = (type) => {
  if (type === "book") {
    return Joi.object(bookFields);
  }
};

// Middleware để xác thực yêu cầu
export const validateRequest = (type) => {
  return (req, res, next) => {
    const schema = getValidationSchema(type);
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => ({
        message: err.message,
        field: err.context.key,
      }));
      return res.status(400).json({ success: false, errors });
    }
    next();
  };
};
