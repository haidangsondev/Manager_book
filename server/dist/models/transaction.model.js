"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var transactionSchema = new _mongoose["default"].Schema({
  user_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  book_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },
  borrowed_date: {
    type: Date,
    "default": Date.now
  },
  due_date: {
    type: Date,
    required: true
  },
  return_date: {
    type: Date,
    "default": null
  },
  status: {
    type: String,
    "enum": ["mượn", "đã trả", "trể hạn"],
    "default": "mượn"
  },
  fine: {
    type: Number,
    "default": 0
  }
}, {
  timestamps: true
});
var Transaction = _mongoose["default"].model("Transaction", transactionSchema);
var _default = exports["default"] = Transaction;