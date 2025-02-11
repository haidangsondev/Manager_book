"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserProfile = exports.updateUser = exports.getUsers = exports.getUserProfile = exports.getUserDetailsByAdmin = exports.getAllUsersByAdmin = exports.deleteUser = exports.createUser = exports.changeUserPassword = void 0;
var _userServices = require("../services/user.services.js");
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
var _password = require("../utils/password.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var getUserProfile = exports.getUserProfile = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
    var _id, User;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _id = req.user._id;
          _context.next = 3;
          return (0, _userServices.getProfile)(_id);
        case 3:
          User = _context.sent;
          return _context.abrupt("return", res.status(User ? 200 : 404).json({
            success: User ? true : false,
            message: User ? "Lấy người dùng thành công" : "Không tìm thấy người dùng",
            data: User
          }));
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var updateUserProfile = exports.updateUserProfile = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _id, updatedData, data, User;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _id = req.user._id;
          updatedData = req.body;
          if (!(Object.keys(req.body).length === 0)) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: "Thông tin cập nhật là bắt buộc"
          }));
        case 4:
          data = _objectSpread({}, updatedData); // Trường hợp có file ảnh gửi lên
          if (req.file) data.avatar = req.file.path;
          _context2.next = 8;
          return (0, _userServices.updateProfile)(_id, data);
        case 8:
          User = _context2.sent;
          return _context2.abrupt("return", res.status(User ? 200 : 500).json({
            success: User ? true : false,
            message: User ? "C\u1EADp nh\u1EADt th\xF4ng tin th\xE0nh c\xF4ng" : "Có lỗi hệ thống xảy ra khi cập nhật thông tin",
            data: User ? User : ""
          }));
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());
var changeUserPassword = exports.changeUserPassword = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _id, _req$body, currentPassword, newPassword, user, isMatch;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _id = req.user._id;
          _req$body = req.body, currentPassword = _req$body.currentPassword, newPassword = _req$body.newPassword;
          _context3.next = 4;
          return (0, _userServices.getProfile)(_id);
        case 4:
          user = _context3.sent;
          if (user) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            success: false,
            message: "Người dùng không tồn tại"
          }));
        case 7:
          _context3.next = 9;
          return (0, _password.checkPassword)(currentPassword, user.password);
        case 9:
          isMatch = _context3.sent;
          if (isMatch) {
            _context3.next = 12;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Mật khẩu hiện tại không đúng"
          }));
        case 12:
          _context3.next = 14;
          return (0, _password.hashPasswrod)(newPassword);
        case 14:
          user.password = _context3.sent;
          _context3.next = 17;
          return user.save();
        case 17:
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            message: "Đổi mật khẩu thành công"
          }));
        case 18:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function changeUserPassword(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

// export const changeUserRole = asyncHandler(async (req, res) => {
//   const { userId } = req.params;
//   const { newRole } = req.body;

//   const validRoles = ["admin", "người dùng", "thủ thư"];
//   if (!validRoles.includes(newRole)) {
//     return res.status(400).json({
//       success: false,
//       message: "Vai trò không hợp lệ",
//     });
//   }

//   const user = await updateUserRole(userId, newRole);

//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "Người dùng không tồn tại",
//     });
//   }

//   return res.status(200).json({
//     success: true,
//     message: `Đã cập nhật vai trò người dùng thành ${newRole}`,
//     data: user,
//   });
// });

// LIBRARIAN

var createUser = exports.createUser = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
    var _req$body2, username, password, Username, user;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
          _context4.next = 3;
          return (0, _userServices.checkUsernameUser)(username);
        case 3:
          Username = _context4.sent;
          if (!Username) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", res.status(409).json({
            success: false,
            message: "Tên người dùng đã tồn tại"
          }));
        case 6:
          _context4.next = 8;
          return (0, _userServices.addUser)(username, password);
        case 8:
          user = _context4.sent;
          return _context4.abrupt("return", res.status(201).json({
            success: true,
            message: "Tạo người dùng thành công",
            user: user
          }));
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}());
var getUsers = exports.getUsers = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
    var username, query, users;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          username = req.query.username; // Thủ thư chỉ có thể quản lý được người dùng có quyền là user
          query = {};
          query.role = "user";
          if (username) {
            // Sử dụng biểu thức chính quy để tìm kiếm không phân biệt chữ hoa chữ thường
            query.username = {
              $regex: new RegExp(username, "i")
            };
          }
          _context5.next = 6;
          return (0, _userServices.getAllUser)(query);
        case 6:
          users = _context5.sent;
          return _context5.abrupt("return", res.status(users.length > 0 ? 200 : 404).json({
            success: users.length > 0,
            message: users.length > 0 ? "Danh sách người dùng" : "Không tìm thấy người dùng",
            data: users
          }));
        case 8:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x11, _x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}());
var updateUser = exports.updateUser = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var userId, updatedData, data, User;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          userId = req.params.userId;
          updatedData = req.body; // Kiểm tra dữ liệu trống
          if (!(!req.body || Object.keys(req.body).length === 0)) {
            _context6.next = 4;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            success: false,
            message: "Thông tin cập nhật là bắt buộc"
          }));
        case 4:
          // Kiểm tra file ảnh
          data = _objectSpread({}, updatedData);
          if (req.file) data.avatar = req.file.path;
          _context6.next = 8;
          return (0, _userServices.updateProfile)(userId, data);
        case 8:
          User = _context6.sent;
          return _context6.abrupt("return", res.status(User ? 200 : 500).json({
            success: User ? true : false,
            message: User ? "Cập nhật thông tin người dùng thành công" : "Có xảy ra lỗi hệ thống khi cập nhật thông tin",
            data: User
          }));
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}());
var deleteUser = exports.deleteUser = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var userId, user;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          userId = req.params.userId;
          _context7.next = 3;
          return (0, _userServices.removeUser)(userId);
        case 3:
          user = _context7.sent;
          return _context7.abrupt("return", res.status(user ? 200 : 404).json({
            success: user ? true : false,
            message: user ? "Đã xóa người dùng thành công" : "Người dùng không tồn tại"
          }));
        case 5:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}());

// ADMIN
var getAllUsersByAdmin = exports.getAllUsersByAdmin = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$query, username, email, role, query, users;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _req$query = req.query, username = _req$query.username, email = _req$query.email, role = _req$query.role; // Sử dụng biểu thức chính quy để tìm kiếm không phân biệt chữ hoa chữ thường
          query = {};
          if (username) query.username = new RegExp(username, "i");
          if (email) query.email = new RegExp(email, "i");
          if (role) query.role = role;
          _context8.next = 7;
          return (0, _userServices.getAllUser)(query);
        case 7:
          users = _context8.sent;
          return _context8.abrupt("return", res.status(users.length > 0 ? 200 : 404).json({
            success: users.length > 0,
            message: users.length > 0 ? "Danh sách người dùng." : "Không tìm thấy người dùng.",
            data: users
          }));
        case 9:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x18, _x19) {
    return _ref8.apply(this, arguments);
  };
}());
var getUserDetailsByAdmin = exports.getUserDetailsByAdmin = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var userId, user;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          userId = req.params.userId;
          _context9.next = 3;
          return (0, _userServices.getProfile)(userId);
        case 3:
          user = _context9.sent;
          return _context9.abrupt("return", res.status(user ? 200 : 404).json({
            success: user ? true : false,
            message: user ? "Chi tiết người dùng." : "Không tìm thấy người dùng",
            data: user
          }));
        case 5:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function (_x20, _x21) {
    return _ref9.apply(this, arguments);
  };
}());