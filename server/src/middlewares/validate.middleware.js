import Joi from "joi";

// Cấu hình Joi
const createJoiSchema = (fields) =>
  Joi.object(fields).messages({
    "string.base": "Trường này phải là chuỗi.",
    "string.min": "Trường này phải có ít nhất {#limit} ký tự.",
    "string.max": "Trường này không vượt qua {#limit} ký tự.",
    "string.email": "Email không hợp lệ.",
    "any.required": "Trường này là bắt buộc.",
    "any.only": "Giá trị không khớp với giá trị mong đợi.",
    "string.pattern.base":
      "Mật khẩu phải chứa ít nhất: một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt.",
    "number.base": "Trường này phải là một số nguyên.",
    "number.min": "Trường này không được nhỏ hơn {#limit}.",
    "number.max": "Trường này không được vượt quá {#limit}.",
  });

// Register
const registerFields = {
  username: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?]).{8,30}$/
    ),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
};

// login
const loginFields = {
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
};

// forgot password
const forgotPasswordFields = {
  email: Joi.string().email().required(),
};

// reset password
const resetPasswordFields = {
  password: Joi.string().min(8).required(),
  tokenPassword: Joi.string().required(),
};

// author
const authorFields = {
  name: Joi.string().min(5).required(),
  bio: Joi.string().required(),
  nationality: Joi.string().required(),
};

// change password
const changePasswordFields = {
  currentPassword: Joi.string().min(8).required(),
  newPassword: Joi.string()
    .min(8)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?]).{8,30}$/
    ),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
};

// user
const userFields = {
  username: Joi.string().min(5).required(),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?]).{8,30}$/
    ),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
};

// category
const categoryFields = {
  name: Joi.string().min(5).required(),
  description: Joi.string().required(),
};

// publisher
const publisherFields = {
  name: Joi.string().min(5).max(100).required(),
  address: Joi.string().max(100).required(),
};

// book
const bookFields = {
  title: Joi.string().min(3).max(256).required(),
  author: Joi.string().required(),
  category: Joi.string().required(),
  publisher: Joi.string().required(),
  isbn: Joi.string().required(),
  year_published: Joi.number().integer().min(0).max(new Date().getFullYear()),
  total_copies: Joi.number().integer().min(0).required(),
  available_copies: Joi.number().integer().min(0).required(),
  reserved_copies: Joi.number().integer().min(0),
  location: Joi.string().max(256),
  status: Joi.string()
    .valid("available", "checked out", "reserved", "lost", "damaged")
    .default("available"),
};

// review
const reviewFields = {
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().optional(),
};

const schemaMap = {
  register: registerFields,
  login: loginFields,
  forgotPassword: forgotPasswordFields,
  resetPassword: resetPasswordFields,
  author: authorFields,
  changePassword: changePasswordFields,
  user: userFields,
  category: categoryFields,
  publisher: publisherFields,
  book: bookFields,
  review: reviewFields,
};

// Hàm trả về biểu mẫu xác thực
const getValidationSchema = (type) => createJoiSchema(schemaMap[type]);

// Xử lý lỗi
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
