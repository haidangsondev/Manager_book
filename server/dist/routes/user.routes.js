"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _jwt = require("../utils/jwt.js");
var _userControllers = require("../controllers/user.controllers.js");
var _cloudinary = _interopRequireDefault(require("../utils/cloudinary.js"));
var _validateMiddleware = require("../middlewares/validate.middleware.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.use(_jwt.verifyAccessToken);
router.get("/profile", _userControllers.getUserProfile);
router.put("/profile", _cloudinary["default"].single("avatar"), _userControllers.updateUserProfile);
router.put("/change-password", (0, _validateMiddleware.validateRequest)("changePassword"), _userControllers.changeUserPassword);

// LIBRARIAN
router.use(_jwt.verifyAccessToken, _jwt.verifyIsLibrarian);
router.post("/", (0, _validateMiddleware.validateRequest)("user"), _userControllers.createUser);
router.get("/", _userControllers.getUsers);
router.put("/:userId", _cloudinary["default"].single("avatar"), _userControllers.updateUser);
router["delete"]("/:userId", _userControllers.deleteUser);

// ADMIN
router.use(_jwt.verifyAccessToken, _jwt.verifyIsAdmin);
router.get("/admin", _userControllers.getAllUsersByAdmin);
router.get("/admin/:userId", _userControllers.getUserDetailsByAdmin);
router.put("/admin/:userId", _cloudinary["default"].single("avatar"), _userControllers.updateUser);
router["delete"]("/admin/:userId", _userControllers.deleteUser);
var _default = exports["default"] = router;