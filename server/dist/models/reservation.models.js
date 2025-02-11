"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// models/reservation.model.js

var reservationSchema = new _mongoose["default"].Schema({
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
  reservation_date: {
    type: Date,
    "default": Date.now
  },
  status: {
    type: String,
    "enum": ["chờ đợi", "hoàn thành", "hủy"],
    "default": "chờ đợi"
  },
  expiry_date: {
    type: Date,
    required: true
  }
});
var Reservation = _mongoose["default"].model("Reservation", reservationSchema);
var _default = exports["default"] = Reservation;