"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var publisherSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 5,
    maxlength: 100
  },
  address: {
    type: String,
    trim: true,
    maxlength: 255
  }
}, {
  timestamps: true
});
var Publisher = _mongoose["default"].model("Publisher", publisherSchema);
var _default = exports["default"] = Publisher;