"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _multerStorageCloudinary = require("multer-storage-cloudinary");
var _cloudinary = require("cloudinary");
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
_cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
var storage = new _multerStorageCloudinary.CloudinaryStorage({
  cloudinary: _cloudinary.v2,
  allowedFormats: ["jpg", "png", "mp4", "mov", "avi", "mkv"],
  params: {
    folder: "Manager book",
    resource_type: "auto"
  }
});
var uploadCloud = (0, _multer["default"])({
  storage: storage
});
var _default = exports["default"] = uploadCloud;