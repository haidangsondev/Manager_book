import Joi from "joi";

const changePasswordFields = {
  currentPassword: Joi.string().min(8).required().messages({
    "string.min": "Mật khẩu cũ  phải có ít nhất 8 ký tự",
    "any.required": "Mật khẩu cũ  là bắt buộc",
  }),
  newPassword: Joi.string().min(8).required().messages({
    "string.min": "Mật khẩu mới phải có ít nhất 8 ký tự",
    "any.required": "Mật khẩu mới là bắt buộc",
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Mật khẩu xác nhận không khớp",
      "any.required": "Xác nhận mật khẩu là bắt buộc",
    }),
};

const messageFields = {
  message: Joi.string().required().messages({
    "any.required": "Tin nhắn mới là bắt buộc",
  }),
};

const createUserFields = {
  username: Joi.string()
    .min(5)
    .messages({
      "string.min": "Tên người dùng phải có ít nhất 5 ký tự.",
    })
    .max(30)
    .messages({
      "string.max": "Tên người dùng không được vượt quá 30 ký tự.",
    })
    .required()
    .messages({
      "any.required": "Tên người dùng là bắt buộc.",
    }),
  password: Joi.string()
    .min(8)
    .messages({
      "string.min": "Mật khẩu phải có ít nhất 8 ký tự.",
    })
    .required()
    .messages({
      "any.required": "Mật khẩu là bắt buộc.",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .messages({
      "any.only": "Mật khẩu xác nhận không khớp.",
    })
    .required()
    .messages({
      "any.required": "Xác nhận mật khẩu là bắt buộc.",
    }),
};

const addUserLibrarianFields = {
  username: Joi.string()
    .min(5)
    .messages({
      "string.min": "Tên người dùng phải có ít nhất 5 ký tự.",
    })
    .max(30)
    .messages({
      "string.max": "Tên người dùng không được vượt quá 30 ký tự.",
    })
    .required()
    .messages({
      "any.required": "Tên người dùng là bắt buộc.",
    }),
  password: Joi.string()
    .min(8)
    .messages({
      "string.min": "Mật khẩu phải có ít nhất 8 ký tự.",
    })
    .required()
    .messages({
      "any.required": "Mật khẩu là bắt buộc.",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .messages({
      "any.only": "Mật khẩu xác nhận không khớp.",
    })
    .required()
    .messages({
      "any.required": "Xác nhận mật khẩu là bắt buộc.",
    }),
};
const getValidationSchema = (type) => {
  if (type === "change-password") return Joi.object(changePasswordFields);
  if (type === "message") return Joi.object(messageFields);
  if (type === "createUser") return Joi.object(createUserFields);
  if (type === "createUserLibrarian") return Joi.object(addUserLibrarianFields);
};

export const validateUser = (type) => {
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
