"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _validateMiddleware = require("../middlewares/validate.middleware.js");
var _jwt = require("../utils/jwt.js");
var _authorControllers = require("../controllers/author.controllers.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.use(_jwt.verifyAccessToken, _jwt.verifyIsLibrarian);
router.post("/", (0, _validateMiddleware.validateRequest)("author"), _authorControllers.createAuthor);
router.get("/", _authorControllers.getAuthors);
router.put("/:authorId", _authorControllers.updateAuthor);
router["delete"]("/:authorId", _authorControllers.deleteAuthor);
var _default = exports["default"] = router;