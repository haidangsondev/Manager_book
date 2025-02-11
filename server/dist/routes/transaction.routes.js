"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _jwt = require("../utils/jwt.js");
var _transactionControllers = require("../controllers/transaction.controllers.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/borrow", _jwt.verifyAccessToken, _transactionControllers.borrowBook);
router.post("/return", _jwt.verifyAccessToken, _transactionControllers.returnBook);
router.post("/extend", _jwt.verifyAccessToken, _transactionControllers.extendBorrowing);
router.get("/history", _jwt.verifyAccessToken, _transactionControllers.getBorrowHistory);

// LIBRARIAN
router.use(_jwt.verifyAccessToken, _jwt.verifyIsLibrarian);
router.get("/", _transactionControllers.getAllTransactions);
router.get("/:transactionId", _transactionControllers.getTransactionDetails);
router["delete"]("/:transactionId", _transactionControllers.deleteTransaction);
var _default = exports["default"] = router;