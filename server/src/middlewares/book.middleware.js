import Joi from "joi";

const bookFields = {
  title: Joi.string()
    .min(3)
    .messages({
      "string.min": "Tên sách phải có ít nhất 5 ký tự.",
    })
    .max(256)
    .messages({
      "string.max": "Tên sách phải có ít nhất 256 ký tự.",
    })
    .required()
    .messages({
      "any.required": "Tên sách là bắt buộc.",
    }),
  author: Joi.string().required().messages({
    "any.required": "Tác giả là bắt buộc.",
  }),
  category: Joi.string().required().messages({
    "any.required": "Thể loại sách là bắt buộc.",
  }),
  publisher: Joi.string().required().messages({
    "any.required": "NXB là bắt buộc.",
  }),
  isbn: Joi.string().required().messages({
    "any.required": "Mã ISBN là bắt buộc.",
  }),
  year_published: Joi.number()
    .integer()
    .messages({
      "number.base": "Năm xuất bản phải là một số nguyên.",
    })
    .min(0)
    .message({
      "number.min": "Năm xuất bản không thể nhỏ hơn 0.",
    })
    .max(new Date().getFullYear())
    .messages({
      "number.max": `Năm xuất bản không được vượt quá ${new Date().getFullYear()}.`,
    }),
  total_copies: Joi.number()
    .integer()
    .messages({
      "number.base": "Tổng số lượng sách phải là số nguyên.",
    })
    .required()
    .messages({
      "any.required": "Tổng số lượng là bắt buộc.",
    })
    .min(0)
    .message({
      "number.min": "Tổng số lượng không thể nhỏ hơn 0.",
    }),
  available_copies: Joi.number()
    .integer()
    .messages({
      "number.base": "Số lượng sách có sẵn phải là số nguyên.",
    })
    .required()
    .messages({
      "any.required": "Số lượng sách có sẵn là bắt buộc.",
    })
    .min(0)
    .message({
      "number.min": "Số lượng sách có sẵn không thể nhỏ hơn 0.",
    }),
  reserved_copies: Joi.number()
    .integer()
    .messages({
      "number.base": "Số lượng sách đặt trước phải là số nguyên.",
    })
    .min(0)
    .message({
      "number.min": "Số lượng sách đặt trước không thể nhỏ hơn 0.",
    }),
  location: Joi.string().max(256).messages({
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

const reviewFields = {
  rating: Joi.number()
    .messages({
      "number.base": "Đánh giá phải là số nguyên",
    })
    .required()
    .messages({
      "any.required": "Đánh giá không được để trống",
    }),
  comment: Joi.string() // Cho phép trường comment là chuỗi
    .optional() // Comment là tùy chọn
    .messages({
      "string.base": "Nhận xét phải là chuỗi",
    }),
};

const getValidationSchema = (type) => {
  if (type === "book") {
    return Joi.object(bookFields);
  }
  if (type === "review") {
    return Joi.object(reviewFields);
  }
};

export const validateBook = (type) => {
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
