"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.register = exports.refreshAccessToken = exports.logoutUser = exports.loginUser = exports.forgotPassword = exports.finalRegister = void 0;
var _authServices = require("../services/auth.services.js");
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
var _sendEmail = require("../utils/sendEmail.js");
var _uniqid = _interopRequireDefault(require("uniqid"));
var _password = require("../utils/password.js");
var _jwt = require("../utils/jwt.js");
var _crypto = _interopRequireDefault(require("crypto"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _excluded = ["password", "refreshToken", "passwordChangeAt", "role", "emailToken"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var register = exports.register = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
    var _req$cookies;
    var email, Email, registerToken, html, subject, data, cookie;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          email = req.body.email;
          _context.next = 3;
          return (0, _authServices.checkEmail)(email);
        case 3:
          Email = _context.sent;
          if (!Email) {
            _context.next = 6;
            break;
          }
          throw new Error("Email đã tồn tại");
        case 6:
          // Tạo registerToken để lưu vào cookie
          registerToken = (0, _uniqid["default"])();
          res.cookie("data_book_register", _objectSpread(_objectSpread({}, req.body), {}, {
            registerToken: registerToken
          }),
          // Hạn sử dụng của cookie là 15 phút
          {
            maxAge: 15 * 60 * 1000,
            httpOnly: true
          });
          html = "\u0110\xE2y l\xE0 m\xE3 \u0111\u1EC3 b\u1EA1n x\xE1c th\u1EF1c t\xE0i kho\u1EA3n email v\xE0 hi\u1EC7u l\u1EF1c l\xE0 15 ph\xFAt. M\xE3<b>  ".concat(registerToken, "</b>");
          subject = "Xác thực tài khoản";
          data = {
            email: email,
            subject: subject,
            html: html
          }; // Gửi email để xác thực người dùng
          _context.next = 13;
          return (0, _sendEmail.sendEmail)(data);
        case 13:
          cookie = (_req$cookies = req.cookies) === null || _req$cookies === void 0 ? void 0 : _req$cookies.data_book_register;
          return _context.abrupt("return", res.status(200).json({
            success: true,
            message: "Kiểm tra email để xác thực tài khoản đã đăng ký"
          }));
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var finalRegister = exports.finalRegister = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var _req$cookies2;
    var register_token, cookie, username, email, password, registerToken, data, response;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          register_token = req.params.register_token;
          cookie = (_req$cookies2 = req.cookies) === null || _req$cookies2 === void 0 ? void 0 : _req$cookies2.data_book_register;
          console.log({
            cookie: cookie,
            register_token: register_token
          });
          // Kiểm tra mã xác thực của người dùng qua email đã đăng ký
          if (!(!cookie || cookie.registerToken !== register_token)) {
            _context2.next = 6;
            break;
          }
          res.clearCookie("data_book_register");
          return _context2.abrupt("return", res.status(500).json({
            success: false,
            message: "Hết thời gian cho việc xác thực tài khoản"
          }));
        case 6:
          // Truy xuất các tài liệu đã lưu trong cookie để tạo tài khoản cho người dùng
          username = cookie.username, email = cookie.email, password = cookie.password, registerToken = cookie.registerToken;
          _context2.t0 = username;
          _context2.t1 = email;
          _context2.next = 11;
          return (0, _password.hashPasswrod)(password);
        case 11:
          _context2.t2 = _context2.sent;
          _context2.t3 = registerToken;
          data = {
            username: _context2.t0,
            email: _context2.t1,
            password: _context2.t2,
            emailToken: _context2.t3,
            isVerify: true
          };
          _context2.next = 16;
          return (0, _authServices.registerUser)(data);
        case 16:
          response = _context2.sent;
          // Xóa các thông tin đã lưu khi đã xác thực mã qua email lúc đăng ký
          res.clearCookie("data_book_register", {
            httpOnly: true,
            secure: true
          });
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            message: "Xác thực tài khoản email thành công",
            user: response
          }));
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
var loginUser = exports.loginUser = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body, email, password, User, _User$toObject, isPassword, refresh_token, passwordChangeAt, role, emailToken, userData, accessToken, refreshToken;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password; // Kiểm tra người dùng đã đăng ký/tồn tại qua hàm checkEmail
          // Kiểm tra mật khẩu có hợp lệ so với lúc đăng ký qua hàm checkPassword
          _context3.next = 3;
          return (0, _authServices.checkEmail)(email);
        case 3:
          User = _context3.sent;
          _context3.t0 = User;
          if (!_context3.t0) {
            _context3.next = 9;
            break;
          }
          _context3.next = 8;
          return (0, _password.checkPassword)(password, User.password);
        case 8:
          _context3.t0 = _context3.sent;
        case 9:
          if (_context3.t0) {
            _context3.next = 11;
            break;
          }
          throw new Error("Email hoặc Password không hợp lệ");
        case 11:
          // Lấy các thông tin cần thiêt của người dùng sau khi kiểm tra thành công
          _User$toObject = User.toObject(), isPassword = _User$toObject.password, refresh_token = _User$toObject.refreshToken, passwordChangeAt = _User$toObject.passwordChangeAt, role = _User$toObject.role, emailToken = _User$toObject.emailToken, userData = _objectWithoutProperties(_User$toObject, _excluded);
          accessToken = (0, _jwt.signAccessToken)(User._id, role);
          refreshToken = (0, _jwt.signRefreshToken)(User._id);
          _context3.next = 16;
          return (0, _authServices.updateUser)(User._id, {
            refreshToken: refreshToken
          });
        case 16:
          // Lưu thông tin refreshToken vào cookie để xác thực người dùng khi có các yêu cầu gửi đến
          // Hạn sử dùng trong cookie là 7 ngày
          res.cookie("refresh_book_token", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
          });
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            message: "Đăng nhập thành công",
            accessToken: accessToken,
            user: userData
          }));
        case 18:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}());
var logoutUser = exports.logoutUser = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var cookie, _id;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          cookie = req.cookies;
          _id = req.user._id; // Xác thực thông tin người dùng khi có yêu cầu gửi đến
          if (!(!cookie || !cookie.refresh_book_token)) {
            _context4.next = 4;
            break;
          }
          throw new Error("Không tìm thấy refresh token ");
        case 4:
          _context4.next = 6;
          return (0, _authServices.updateUser)(_id, {
            refreshToken: ""
          });
        case 6:
          // Xóa refreshToken khỏi cookie sau khi đăng xuất
          res.clearCookie("refresh_book_token", {
            httpOnly: true,
            secure: true
          });
          return _context4.abrupt("return", res.status(200).json({
            success: true,
            message: "Đăng xuất thành công"
          }));
        case 8:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}());
var forgotPassword = exports.forgotPassword = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var email, User, passwordResetToken, html, subject, data;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          email = req.body.email;
          _context5.next = 3;
          return (0, _authServices.checkEmail)(email);
        case 3:
          User = _context5.sent;
          if (User) {
            _context5.next = 6;
            break;
          }
          throw new Error("Email không tồn tại");
        case 6:
          _context5.next = 8;
          return User.createPasswordToken();
        case 8:
          passwordResetToken = _context5.sent;
          _context5.next = 11;
          return User.save();
        case 11:
          html = "\u0110\xE2y l\xE0 m\xE3 b\u1EA1n c\u1EA7n \u0111\u1EC3 x\xE1c th\u1EF1c t\xE0i kho\u1EA3n email \u0111\u1EC3 th\u1EF1c hi\u1EC7n \u0111\u1ED5i m\u1EADt kh\u1EA9u v\xE0 hi\u1EC7u l\u1EF1c l\xE0 15 ph\xFAt. M\xE3 <b> ".concat(passwordResetToken, " </b>");
          subject = "Quên mật khẩu";
          data = {
            email: email,
            html: html,
            subject: subject
          }; // Gửi email để xác thực mã người dùng
          _context5.next = 16;
          return (0, _sendEmail.sendEmail)(data);
        case 16:
          return _context5.abrupt("return", res.status(200).json({
            success: true,
            message: "Kiểm tra email để xác thực cho việc cho quá trình đổi mật khẩu"
          }));
        case 17:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}());
var resetPassword = exports.resetPassword = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body2, password, tokenPassword, passwordResetToken, User;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$body2 = req.body, password = _req$body2.password, tokenPassword = _req$body2.tokenPassword; // Tạo mã băm dạng(token) cho cho mật khẩu
          passwordResetToken = _crypto["default"].createHash("sha256").update(tokenPassword).digest("hex");
          _context6.next = 4;
          return (0, _authServices.checkPasswordToken)(passwordResetToken);
        case 4:
          User = _context6.sent;
          if (User) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(500).json({
            success: false,
            message: "Mã xác thực không tồn tại hoặc đã hết hạn"
          }));
        case 7:
          _context6.next = 9;
          return (0, _password.hashPasswrod)(password);
        case 9:
          User.password = _context6.sent;
          User.passwordResetToken = undefined;
          User.passwordResetExpires = undefined;
          User.passwordChangeAt = Date.now();
          _context6.next = 15;
          return User.save();
        case 15:
          return _context6.abrupt("return", res.status(200).json({
            success: true,
            message: "Đổi mật khẩu thành công"
          }));
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}());
var refreshAccessToken = exports.refreshAccessToken = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var cookie;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          cookie = req.cookies;
          if (!(!cookie || !cookie.refresh_book_token)) {
            _context8.next = 3;
            break;
          }
          throw new Error("Không tìm thấy refresh token ");
        case 3:
          // Xác thực người dùng
          _jsonwebtoken["default"].verify(
          // refreshTonken của người dùng đã lưu vào cookie khi đăng nhập thành công
          cookie.refresh_token, process.env.JWT_SECRETKEY, /*#__PURE__*/function () {
            var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(err, decode) {
              var User, accessToken;
              return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    if (!err) {
                      _context7.next = 2;
                      break;
                    }
                    return _context7.abrupt("return", res.status(401).json({
                      success: false,
                      message: "Xác thực người dùng không thành công"
                    }));
                  case 2:
                    _context7.next = 4;
                    return (0, _authServices.checkUserRefreshAccessToken)({
                      _id: decode._id,
                      refreshToken: cookie.refresh_book_token
                    });
                  case 4:
                    User = _context7.sent;
                    if (User) {
                      _context7.next = 7;
                      break;
                    }
                    throw new Error("Người dùng không tồn tại");
                  case 7:
                    accessToken = (0, _jwt.signAccessToken)(User._id);
                    return _context7.abrupt("return", res.status(200).json({
                      success: true,
                      accessToken: accessToken,
                      message: "Xác thực ngươì dùng thành công"
                    }));
                  case 9:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7);
            }));
            return function (_x17, _x18) {
              return _ref8.apply(this, arguments);
            };
          }());
        case 4:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x15, _x16) {
    return _ref7.apply(this, arguments);
  };
}());