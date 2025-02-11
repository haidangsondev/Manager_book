"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _validateMiddleware = require("../middlewares/validate.middleware.js");
var _jwt = require("../utils/jwt.js");
var _bookControllers = require("../controllers/book.controllers.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.use(_jwt.verifyAccessToken);
router.get("/", _bookControllers.getBooks);
router.get("/:bookId", _bookControllers.getBookId);
router.post("/review/:bookId", (0, _validateMiddleware.validateRequest)("review"), _bookControllers.createReview);
router["delete"]("/review/:reviewId", _bookControllers.removeReview);

// LIBRARIAN
router.use(_jwt.verifyAccessToken, _jwt.verifyIsLibrarian);
router.post("/", (0, _validateMiddleware.validateRequest)("book"), _bookControllers.createBook);
router.put("/:bookId", _bookControllers.editBook);
router["delete"]("/:bookId", _bookControllers.removeBook);
router.get("/review/:reviewId", _bookControllers.getBookReviewById);
router.get("/review", _bookControllers.getBookReviews);
router["delete"]("/review/:reviewId", _bookControllers.deleteBookReview);
var _default = exports["default"] = router;