"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _jwt = require("../utils/jwt.js");
var _reversationControllers = require("../controllers/reversation.controllers.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/", _jwt.verifyAccessToken, _reversationControllers.reserveBook);
router.get("/", _jwt.verifyAccessToken, _reversationControllers.getReservations);
router.patch("/cancel/:reservationId", _jwt.verifyAccessToken, _reversationControllers.cancelBookReservation);

// LIBRARIAN
router.use(_jwt.verifyAccessToken, _jwt.verifyIsLibrarian);
router.get("/", _reversationControllers.getAllReservations);
router.get("/:reservationId", _reversationControllers.getReservationDetails);
router.patch("/:reservationId", _reversationControllers.updateReservationStatus);
router["delete"]("/:reservationId", _reversationControllers.deleteReservation);
var _default = exports["default"] = router;