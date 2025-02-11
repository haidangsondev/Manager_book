"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var categorySchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 250,
    "default": ""
  }
}, {
  timestamps: true
});
var Category = _mongoose["default"].model("Category", categorySchema);
var _default = exports["default"] = Category;