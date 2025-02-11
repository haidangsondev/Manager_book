"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var reviewSchema = new _mongoose["default"].Schema({
  book_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },
  user_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    "default": ""
  }
}, {
  timestamps: true
});
var Review = _mongoose["default"].model("Review", reviewSchema);
var _default = exports["default"] = Review;