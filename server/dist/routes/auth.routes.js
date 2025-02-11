"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _validateMiddleware = require("../middlewares/validate.middleware.js");
var _authControllers = require("../controllers/auth.controllers.js");
var _jwt = require("../utils/jwt.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/register", (0, _validateMiddleware.validateRequest)("register"), _authControllers.register);
router.post("/final-register/:register_token", _authControllers.finalRegister);
router.post("/login", (0, _validateMiddleware.validateRequest)("login"), _authControllers.loginUser);
router.post("/logout", _jwt.verifyAccessToken, _authControllers.logoutUser);
router.post("/forgot-password", (0, _validateMiddleware.validateRequest)("forgotPassword"), _authControllers.forgotPassword);
router.put("/reset-password", (0, _validateMiddleware.validateRequest)("resetPassword"), _authControllers.resetPassword);
router.post("/refresh-token", _jwt.verifyAccessToken, _authControllers.refreshAccessToken);
var _default = exports["default"] = router;