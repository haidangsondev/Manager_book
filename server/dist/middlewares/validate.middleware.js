"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRequest = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Cấu hình Joi
var createJoiSchema = function createJoiSchema(fields) {
  return _joi["default"].object(fields).messages({
    "string.base": "Trường này phải là chuỗi.",
    "string.min": "Trường này phải có ít nhất {#limit} ký tự.",
    "string.max": "Trường này không vượt qua {#limit} ký tự.",
    "string.email": "Email không hợp lệ.",
    "any.required": "Trường này là bắt buộc.",
    "any.only": "Giá trị không khớp với giá trị mong đợi.",
    "string.pattern.base": "Mật khẩu phải chứa ít nhất: một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt.",
    "number.base": "Trường này phải là một số nguyên.",
    "number.min": "Trường này không được nhỏ hơn {#limit}.",
    "number.max": "Trường này không được vượt quá {#limit}."
  });
};

// Register
var registerFields = {
  username: _joi["default"].string().min(5).required(),
  email: _joi["default"].string().email().required(),
  password: _joi["default"].string().min(8).required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?]).{8,30}$/),
  confirmPassword: _joi["default"].string().valid(_joi["default"].ref("password")).required()
};

// login
var loginFields = {
  email: _joi["default"].string().email().required(),
  password: _joi["default"].string().min(8).required()
};

// forgot password
var forgotPasswordFields = {
  email: _joi["default"].string().email().required()
};

// reset password
var resetPasswordFields = {
  password: _joi["default"].string().min(8).required(),
  tokenPassword: _joi["default"].string().required()
};

// author
var authorFields = {
  name: _joi["default"].string().min(5).required(),
  bio: _joi["default"].string().required(),
  nationality: _joi["default"].string().required()
};

// change password
var changePasswordFields = {
  currentPassword: _joi["default"].string().min(8).required(),
  newPassword: _joi["default"].string().min(8).required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?]).{8,30}$/),
  confirmPassword: _joi["default"].string().valid(_joi["default"].ref("password")).required()
};

// user
var userFields = {
  username: _joi["default"].string().min(5).required(),
  password: _joi["default"].string().min(8).required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?]).{8,30}$/),
  confirmPassword: _joi["default"].string().valid(_joi["default"].ref("password")).required()
};

// category
var categoryFields = {
  name: _joi["default"].string().min(5).required(),
  description: _joi["default"].string().required()
};

// publisher
var publisherFields = {
  name: _joi["default"].string().min(5).max(100).required(),
  address: _joi["default"].string().max(100).required()
};

// book
var bookFields = {
  title: _joi["default"].string().min(3).max(256).required(),
  author: _joi["default"].string().required(),
  category: _joi["default"].string().required(),
  publisher: _joi["default"].string().required(),
  isbn: _joi["default"].string().required(),
  year_published: _joi["default"].number().integer().min(0).max(new Date().getFullYear()),
  total_copies: _joi["default"].number().integer().min(0).required(),
  available_copies: _joi["default"].number().integer().min(0).required(),
  reserved_copies: _joi["default"].number().integer().min(0),
  location: _joi["default"].string().max(256),
  status: _joi["default"].string().valid("available", "checked out", "reserved", "lost", "damaged")["default"]("available")
};

// review
var reviewFields = {
  rating: _joi["default"].number().min(1).max(5).required(),
  comment: _joi["default"].string().optional()
};
var schemaMap = {
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
  review: reviewFields
};

// Hàm trả về biểu mẫu xác thực
var getValidationSchema = function getValidationSchema(type) {
  return createJoiSchema(schemaMap[type]);
};

// Xử lý lỗi
var validateRequest = exports.validateRequest = function validateRequest(type) {
  return function (req, res, next) {
    var schema = getValidationSchema(type);
    var _schema$validate = schema.validate(req.body, {
        abortEarly: false
      }),
      error = _schema$validate.error;
    if (error) {
      var errors = error.details.map(function (err) {
        return {
          message: err.message,
          field: err.context.key
        };
      });
      return res.status(400).json({
        success: false,
        errors: errors
      });
    }
    next();
  };
};