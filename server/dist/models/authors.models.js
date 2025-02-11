"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var authorSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  nationality: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});
var Author = _mongoose["default"].model("Author", authorSchema);
var _default = exports["default"] = Author;