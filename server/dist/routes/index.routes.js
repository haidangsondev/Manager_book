"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _errorMiddleware = require("../middlewares/error.middleware.js");
var _authRoutes = _interopRequireDefault(require("./auth.routes.js"));
var _categoryRoutes = _interopRequireDefault(require("./category.routes.js"));
var _authorRoutes = _interopRequireDefault(require("./author.routes.js"));
var _userRoutes = _interopRequireDefault(require("./user.routes.js"));
var _bookRoutes = _interopRequireDefault(require("./book.routes.js"));
var _transactionRoutes = _interopRequireDefault(require("./transaction.routes.js"));
var _reservationRoutes = _interopRequireDefault(require("./reservation.routes.js"));
var _publisherRoutes = _interopRequireDefault(require("./publisher.routes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var initialRouter = function initialRouter(app) {
  app.use("/api/auth", _authRoutes["default"]);
  app.use("/api/user", _userRoutes["default"]);
  app.use("/api/category", _categoryRoutes["default"]);
  app.use("/api/author", _authorRoutes["default"]);
  app.use("/api/publisher", _publisherRoutes["default"]);
  app.use("/api/book", _bookRoutes["default"]);
  app.use("/api/transaction", _transactionRoutes["default"]);
  app.use("/api/reservation", _reservationRoutes["default"]);
  app.use(_errorMiddleware.notFound);
  app.use(_errorMiddleware.errorHandler);
};
var _default = exports["default"] = initialRouter;