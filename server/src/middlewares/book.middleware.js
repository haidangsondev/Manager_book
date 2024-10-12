import Joi from "joi";
import validator from "validator";

const bookFields = {
  title: Joi.string()
    .min(1)
    .messages({
      "string.min": "Tiêu đề phải có ít nhất 1 ký tự.",
    })
    .max(200)
    .messages({
      "string.max": "Tiêu đề không được vượt quá 200 ký tự.",
    })
    .required()
    .messages({
      "any.required": "Tiêu đề là bắt buộc.",
    }),
  author: Joi.string()
    .min(1)
    .messages({
      "string.min": "Tên tác giả phải có ít nhất 1 ký tự.",
    })
    .max(200)
    .messages({
      "string.max": "Tên tác giả không được vượt quá 200 ký tự.",
    })
    .required()
    .messages({
      "any.required": "Tên tác giả là bắt buộc.",
    }),

  isbn: Joi.string().required().messages({
    "any.required": "ISBN là trường bắt buộc.",
  }),
  publisher: Joi.string()
    .max(200)
    .messages({
      "string.max": "Nhà xuất bản không được vượt quá 200 ký tự.",
    })
    .required()
    .messages({
      "any.required": "Nhà xuất bản là bắt buộc.",
    }),
  publishedDate: Joi.date()
    .iso()
    .messages({
      "any.required": "Ngày xuất bản phải là định dạng ngày hợp lệ.",
    })
    .required()
    .messages({
      "any.required": "Ngày xuất bản là trường bắt buộc.",
    }),
  status: Joi.string()
    .valid("Có sẵn", "Đã mượn", "Đã đặt trước")
    .default("Có sẵn")
    .messages({
      "any.only":
        "Trạng thái sách chỉ có thể là 'Có sẵn', 'Đã mượn', hoặc 'Đã đặt trước'.",
    }),
  category: Joi.string().required().messages({
    "any.required": "Thể loại sách là bẳt buộc.",
  }),
};

const reviewFields = {
  rating: Joi.number()
    .min(1)
    .messages({
      "string.min": "Đánh giá ít nhất 1 sao.",
    })
    .max(5)
    .messages({
      "string.max": "Đánh giá ít nhất 5 sao.",
    })
    .required()
    .messages({
      "any.required": "Đánh giá là bắt buộc.",
    }),
  comment: Joi.string().required().messages({
    "any.required": "Bình luận là bắt buộc.",
  }),
};

const getValidationSchema = (type) => {
  if (type === "create-book") {
    return Joi.object(bookFields);
  }
  if (type === "review") {
    return Joi.object(reviewFields);
  }
};

export const validateRequest = (type) => {
  return (req, res, next) => {
    const schema = getValidationSchema(type);

    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((err) => ({
        message: err.message,
        Trường: err.context.key, // Thêm trường bị lỗi
      }));
      return res.status(400).json({ success: false, errors });
    }

    next();
  };
};
