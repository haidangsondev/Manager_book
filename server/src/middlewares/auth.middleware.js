import Joi from "joi";

const registerFields = {
  username: Joi.string().min(5).required().messages({
    "string.base": "Tên người dùng phải là chuỗi.",
    "string.min": "Tên người dùng phải có ít nhất 5 ký tự.",
    "any.required": "Tên người dùng là bắt buộc.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email không hợp lệ.",
    "any.required": "Email là bắt buộc.",
  }),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?]).{8,30}$/
    )
    .messages({
      "string.min": "Mật khẩu phải có ít nhất 8 ký tự.",
      "string.pattern.base":
        "Mật khẩu phải chứa ít nhất: một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt.",

      "any.required": "Mật khẩu là bắt buộc.",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Mật khẩu xác nhận không khớp.",
    "any.required": "Xác nhận mật khẩu là bắt buộc.",
  }),
};
const loginFields = {
  email: Joi.string()
    .email()
    .messages({
      "string.email": "Email không hợp lệ.",
    })
    .required()
    .messages({
      "any.required": "Email là bắt buộc.",
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
};

const forgotPasswordFields = {
  email: Joi.string()
    .email()
    .messages({
      "string.email": "Email không hợp lệ.",
    })
    .required()
    .messages({
      "any.required": "Email là bắt buộc.",
    }),
};
const resetPasswordFields = {
  password: Joi.string()
    .min(8)
    .messages({
      "string.min": "Mật khẩu phải có ít nhất 8 ký tự.",
    })
    .required()
    .messages({
      "any.required": "Mật khẩu là bắt buộc.",
    }),
  tokenPassword: Joi.string().required().messages({
    "any.required": "Token password là bắt buộc.",
  }),
};
const getValidationSchema = (type) => {
  // if (type === "register") {
  //   return Joi.object(registerFields);
  // }

  // if (type === "login") return Joi.object(loginFields);
  // if (type === "forgot-password") return Joi.object(forgotPasswordFields);
  // if (type === "reset-password") return Joi.object(resetPasswordFields);

  switch (type) {
    case "register":
      return Joi.object(registerFields);
      break;

    case "login":
      return Joi.object(loginFields);
      break;

    case "forgot-password":
      return Joi.object(forgotPasswordFields);
      break;
    case "reset-password":
      return Joi.object(resetPasswordFields);
      break;

    default:
      "";
      break;
  }
};

// handle error
export const validateRequest = (type) => {
  return (req, res, next) => {
    const schema = getValidationSchema(type);

    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((err) => ({
        message: err.message,
        Trường: err.context.key,
      }));
      return res.status(400).json({ success: false, errors });
    }

    next();
  };
};
