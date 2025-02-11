"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notFound = exports.errorHandler = void 0;
var notFound = exports.notFound = function notFound(req, res, next) {
  var error = new Error("Route ".concat(req.originalUrl, " not found"));
  console.log(error);
  res.status(404);
  next(error);
};
var errorHandler = exports.errorHandler = function errorHandler(error, req, res, next) {
  var statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.log(error);
  return res.status(statusCode).json({
    success: false,
    message: (error === null || error === void 0 ? void 0 : error.message) || error
  });
};