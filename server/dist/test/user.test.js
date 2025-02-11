"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _setTest = require("../../setTest");
var _supertest = _interopRequireDefault(require("supertest"));
var _index = _interopRequireWildcard(require("../../index"));
var _userServices = require("../../src/services/user.services.js");
var _password = require("../../src/utils/password.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
jest.mock("../../src/services/user.services.js"); // Mock các service
jest.mock("../../src/utils/password.js"); // Mock các service

beforeAll(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return (0, _setTest.connectTest)();
      case 2:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));
afterAll(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.next = 2;
        return (0, _setTest.closeConnectTest)();
      case 2:
        _index.server.close();
      case 3:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})), 5000);
describe("User", function () {
  beforeEach(function () {
    jest.clearAllMocks();
  });
  describe("GET /api/user/profile", function () {
    it("Trả về 404 nếu không tìm thấy người dùng", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var response;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            // Mock `getProfile` trả về null (không tìm thấy người dùng)
            _userServices.getProfile.mockResolvedValue(null);
            _context3.next = 3;
            return (0, _supertest["default"])(_index["default"]).get("/api/user/profile");
          case 3:
            response = _context3.sent;
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Không tìm thấy người dùng");
          case 7:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    })));
    it("Trả về 200 nếu tìm thấy người dùng", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var mockUser, response;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            mockUser = {
              _id: "675cf5e5ee774cbbc8f9e57f",
              passwordResetExpires: "",
              username: "Hai Dang Son",
              email: "haidangson.dev@gmail.com",
              membership_status: "hoạt động",
              isVerify: true,
              avatar: "",
              passwordChangeAt: "1735119581585",
              role: "user",
              borrowedBooks: [],
              reservedBooks: [],
              history: [],
              createdAt: "2024-12-14T03:05:09.921Z",
              updatedAt: "2024-12-25T09:40:33.917Z"
            }; // Mock `getProfile` trả về đối tượng người dùng hợp lệ
            _userServices.getProfile.mockResolvedValue(mockUser);
            _context4.next = 4;
            return (0, _supertest["default"])(_index["default"]).get("/api/user/profile");
          case 4:
            response = _context4.sent;
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Lấy người dùng thành công");
            expect(response.body.data).toEqual(mockUser);
          case 9:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    })));
  });
  describe("PUT /api/user/profile", function () {
    it("Trả về 400 nếu không gửi dữ liệu để cập nhật", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var response;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _supertest["default"])(_index["default"]).put("/api/user/profile").send({});
          case 2:
            response = _context5.sent;
            // Không gửi dữ liệu cập nhật

            expect(response.status).toBe(400); // Có thể điều chỉnh nếu cần
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Thông tin cập nhật là bắt buộc");
          case 6:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    })));
    it("Trả về 500 nếu hệ thống xảy ra lỗi", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var response;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            // Mock `updateProfile` trả về null (cập nhật không thành công)
            _userServices.updateProfile.mockResolvedValue(null);
            _context6.next = 3;
            return (0, _supertest["default"])(_index["default"]).put("/api/user/profile").send({
              name: "Nguyễn Văn A",
              email: "test@example.com"
            });
          case 3:
            response = _context6.sent;
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Có lỗi hệ thống xảy ra khi cập nhật thông tin");
            expect(response.body.data).toBe("");
          case 8:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    })));
    it("Trả về 200 nếu cập nhật thông tin người dùng thành công", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var mockUpdatedUser, response;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            mockUpdatedUser = {
              _id: "1",
              username: "Nguyễn Văn A"
            }; // Mock `updateProfile` trả về thông tin người dùng đã được cập nhật
            _userServices.updateProfile.mockResolvedValue(mockUpdatedUser);
            _context7.next = 4;
            return (0, _supertest["default"])(_index["default"]).put("/api/user/profile").send({
              username: "Nguyễn Văn A",
              email: "test@example.com"
            });
          case 4:
            response = _context7.sent;
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Cập nhật thông tin thành công");
            expect(response.body.data).toEqual(mockUpdatedUser);
          case 9:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    })));
  });
  describe("PUT /api/user/change-password", function () {
    it("Trả về 404 nếu người dùng không tồn tại", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var response;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            // Mock `getProfile` trả về null (người dùng không tồn tại)
            _userServices.getProfile.mockResolvedValue(null);
            _context8.next = 3;
            return (0, _supertest["default"])(_index["default"]).put("/api/user/change-password").send({
              currentPassword: "oldPassword123",
              newPassword: "newPassword123",
              confirmPassword: "newPassword123"
            });
          case 3:
            response = _context8.sent;
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Người dùng không tồn tại");
          case 7:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    })));
    it("Trả về 401 nếu mật khẩu hiện tại không đúng", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
      var mockUser, response;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            mockUser = {
              _id: "1",
              password: "hashedOldPassword"
            }; // Mock `getProfile` trả về người dùng hợp lệ
            _userServices.getProfile.mockResolvedValue(mockUser);
            // Mock `checkPassword` trả về false (mật khẩu không đúng)
            _password.checkPassword.mockResolvedValue(false);
            _context9.next = 5;
            return (0, _supertest["default"])(_index["default"]).put("/api/user/change-password").send({
              currentPassword: "wrongPassword123",
              newPassword: "newPassword123",
              confirmPassword: "newPassword123"
            });
          case 5:
            response = _context9.sent;
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Mật khẩu hiện tại không đúng");
          case 9:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    })));
    it("Trả về 200 nếu mật khẩu thay đổi thành công", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
      var mockUser, response;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            mockUser = {
              _id: "1",
              password: "hashedOldPassword"
            };
            _userServices.getProfile.mockResolvedValue(mockUser);
            _password.checkPassword.mockResolvedValue(true);
            _password.hashPasswrod.mockResolvedValue("hashedNewPassword");
            mockUser.save = jest.fn().mockResolvedValue(mockUser);
            _context10.next = 7;
            return (0, _supertest["default"])(_index["default"]).put("/api/user/change-password").send({
              currentPassword: "oldPassword123",
              newPassword: "newPassword123",
              confirmPassword: "newPassword123"
            });
          case 7:
            response = _context10.sent;
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Đổi mật khẩu thành công");
          case 11:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    })));
  });
  describe("POST /api/user", function () {
    it("Trả về 409 nếu tên người dùng đã tồn tại", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
      var response;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            // Mock `checkUsernameUser` trả về true (tên người dùng đã tồn tại)
            _userServices.checkUsernameUser.mockResolvedValue(true);
            _context11.next = 3;
            return (0, _supertest["default"])(_index["default"]).post("/api/user").send({
              username: "testUser",
              password: "password123",
              confirmPassword: "password123"
            });
          case 3:
            response = _context11.sent;
            expect(response.status).toBe(409);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Tên người dùng đã tồn tại");
          case 7:
          case "end":
            return _context11.stop();
        }
      }, _callee11);
    })));
    it("Trả về 201 nếu tạo người dùng thành công", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
      var mockUser, response;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            mockUser = {
              id: "1",
              username: "testUser"
            }; // Mock `checkUsernameUser` trả về false (tên người dùng chưa tồn tại)
            _userServices.checkUsernameUser.mockResolvedValue(false);
            // Mock `addUser` trả về thông tin người dùng mới
            _userServices.addUser.mockResolvedValue(mockUser);
            _context12.next = 5;
            return (0, _supertest["default"])(_index["default"]).post("/api/user").send({
              username: "testUser",
              password: "password123",
              confirmPassword: "password123"
            });
          case 5:
            response = _context12.sent;
            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Tạo người dùng thành công");
            expect(response.body.user).toEqual(mockUser);
          case 10:
          case "end":
            return _context12.stop();
        }
      }, _callee12);
    })));
  });
  describe("GET /api/user", function () {
    it("Trả về 404 nếu không tìm thấy người dùng", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
      var response;
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            // Mock `getAllUser` trả về null hoặc mảng rỗng
            _userServices.getAllUser.mockResolvedValue([]);
            _context13.next = 3;
            return (0, _supertest["default"])(_index["default"]).get("/api/user").query({
              username: "nonexistentuser"
            });
          case 3:
            response = _context13.sent;
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Không tìm thấy người dùng");
          case 7:
          case "end":
            return _context13.stop();
        }
      }, _callee13);
    })));
    it("Trả về 200 và danh sách người dùng nếu tìm thấy", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
      var mockUsers, response;
      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            mockUsers = [{
              id: "1",
              username: "user1",
              role: "user"
            }, {
              id: "2",
              username: "user2",
              role: "user"
            }]; // Mock `getAllUser` trả về danh sách người dùng
            _userServices.getAllUser.mockResolvedValue(mockUsers);
            _context14.next = 4;
            return (0, _supertest["default"])(_index["default"]).get("/api/user").query({
              role: "user"
            });
          case 4:
            response = _context14.sent;
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Danh sách người dùng");
            expect(response.body.data).toEqual(mockUsers);
          case 9:
          case "end":
            return _context14.stop();
        }
      }, _callee14);
    })));
    it("Tên trả về 200 và danh sách người dùng theo username", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
      var mockUser, response;
      return _regeneratorRuntime().wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            mockUser = [{
              id: "1",
              username: "specificUser",
              role: "user"
            }]; // Mock `getAllUser` trả về danh sách người dùng phù hợp
            _userServices.getAllUser.mockResolvedValue(mockUser);
            _context15.next = 4;
            return (0, _supertest["default"])(_index["default"]).get("/api/user").query({
              username: "specificUser"
            });
          case 4:
            response = _context15.sent;
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Danh sách người dùng");
            expect(response.body.data).toEqual(mockUser);
          case 9:
          case "end":
            return _context15.stop();
        }
      }, _callee15);
    })));
  });
  describe("PUT /api/user/:userId", function () {
    it("Trả về 400 nếu không có dữ liệu cập nhật", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
      var response;
      return _regeneratorRuntime().wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return (0, _supertest["default"])(_index["default"]).put("/api/user/1") // Gửi yêu cầu PUT với userId
            .send({});
          case 2:
            response = _context16.sent;
            // Không gửi dữ liệu

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Thông tin cập nhật là bắt buộc");
          case 6:
          case "end":
            return _context16.stop();
        }
      }, _callee16);
    })));
    it("Trả về 500 nếu có lỗi hệ thống khi cập nhật", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
      var response;
      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            // Mock `updateUserInfo` trả về null (cập nhật thất bại)
            _userServices.updateProfile.mockResolvedValue(null);
            _context17.next = 3;
            return (0, _supertest["default"])(_index["default"]).put("/api/user/1") // Gửi yêu cầu PUT với userId
            .send({
              username: "Nguyễn Văn A"
            });
          case 3:
            response = _context17.sent;
            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Có xảy ra lỗi hệ thống khi cập nhật thông tin");
          case 7:
          case "end":
            return _context17.stop();
        }
      }, _callee17);
    })));
    it("Trả về 200 nếu cập nhật thông tin người dùng thành công", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
      var mockUpdatedUser, response;
      return _regeneratorRuntime().wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            mockUpdatedUser = {
              id: "1",
              username: "Nguyễn Văn A",
              avatar: "path/to/avatar.jpg"
            }; // Mock `updateUserInfo` trả về thông tin người dùng đã cập nhật
            _userServices.updateProfile.mockResolvedValue(mockUpdatedUser);
            _context18.next = 4;
            return (0, _supertest["default"])(_index["default"]).put("/api/user/1") // Gửi yêu cầu PUT với userId
            .send({
              username: "Nguyễn Văn A"
            });
          case 4:
            response = _context18.sent;
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Cập nhật thông tin người dùng thành công");
            expect(response.body.data).toEqual(mockUpdatedUser);
          case 9:
          case "end":
            return _context18.stop();
        }
      }, _callee18);
    })));
  });
  describe("DELETE /api/user/:userId", function () {
    it("Trả về 404 nếu người dùng không tồn tại", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19() {
      var response;
      return _regeneratorRuntime().wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            // Mock `removeUser` trả về null (người dùng không tồn tại)
            _userServices.removeUser.mockResolvedValue(null);
            _context19.next = 3;
            return (0, _supertest["default"])(_index["default"])["delete"]("/api/user/999");
          case 3:
            response = _context19.sent;
            // Gửi yêu cầu DELETE với userId không tồn tại

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Người dùng không tồn tại");
          case 7:
          case "end":
            return _context19.stop();
        }
      }, _callee19);
    })));
    it("Trả về 200 nếu người dùng được xóa thành công", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20() {
      var mockDeletedUser, response;
      return _regeneratorRuntime().wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            mockDeletedUser = {
              id: "1",
              username: "Nguyễn Văn A"
            }; // Mock `removeUser` trả về thông tin người dùng đã xóa
            _userServices.removeUser.mockResolvedValue(mockDeletedUser);
            _context20.next = 4;
            return (0, _supertest["default"])(_index["default"])["delete"]("/api/user/1");
          case 4:
            response = _context20.sent;
            // Gửi yêu cầu DELETE với userId

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Đã xóa người dùng thành công");
          case 8:
          case "end":
            return _context20.stop();
        }
      }, _callee20);
    })));
  });
  describe("GET /api/user/admin", function () {
    it("Trả về 404 nếu không tìm thấy người dùng", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21() {
      var response;
      return _regeneratorRuntime().wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            // Mock `getAllUser` trả về `null` hoặc danh sách rỗng
            _userServices.getAllUser.mockResolvedValue([]);
            _context21.next = 3;
            return (0, _supertest["default"])(_index["default"]).get("/api/user/admin").query({
              username: "nonexistent"
            });
          case 3:
            response = _context21.sent;
            // Gửi yêu cầu với username không tồn tại

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Không tìm thấy người dùng.");
          case 7:
          case "end":
            return _context21.stop();
        }
      }, _callee21);
    })));
    it("Trả về 200 và danh sách người dùng theo từ khóa tìm kiếm", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22() {
      var mockUsers, response;
      return _regeneratorRuntime().wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            mockUsers = [{
              id: "1",
              username: "user1",
              email: "user1@example.com",
              role: "user"
            }, {
              id: "2",
              username: "admin1",
              email: "admin1@example.com",
              role: "admin"
            }]; // Mock `getAllUser` trả về toàn bộ người dùng
            _userServices.getAllUser.mockResolvedValue(mockUsers);
            _context22.next = 4;
            return (0, _supertest["default"])(_index["default"]).get("/api/user/admin").query({
              role: "user"
            });
          case 4:
            response = _context22.sent;
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Danh sách người dùng.");
            expect(response.body.data).toEqual(mockUsers);
          case 9:
          case "end":
            return _context22.stop();
        }
      }, _callee22);
    })));
    it("Trả về 200 nếu tìm thấy danh sách người dùng", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23() {
      var mockUsers, response;
      return _regeneratorRuntime().wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
          case 0:
            mockUsers = [{
              id: "1",
              username: "user1",
              email: "user1@example.com",
              role: "user"
            }, {
              id: "2",
              username: "admin1",
              email: "admin1@example.com",
              role: "admin"
            }]; // Mock `getAllUser` trả về danh sách người dùng
            _userServices.getAllUser.mockResolvedValue(mockUsers);
            _context23.next = 4;
            return (0, _supertest["default"])(_index["default"]).get("/api/user/admin");
          case 4:
            response = _context23.sent;
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Danh sách người dùng.");
            expect(response.body.data).toEqual(mockUsers);
          case 9:
          case "end":
            return _context23.stop();
        }
      }, _callee23);
    })));
  });
  describe("GET /api/user/admin/:userId", function () {
    it("Trả về 404 nếu không tìm thấy người dùng", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24() {
      var response;
      return _regeneratorRuntime().wrap(function _callee24$(_context24) {
        while (1) switch (_context24.prev = _context24.next) {
          case 0:
            // Mock `getProfile` trả về null
            _userServices.getProfile.mockResolvedValue(null);
            _context24.next = 3;
            return (0, _supertest["default"])(_index["default"]).get("/api/user/admin/999");
          case 3:
            response = _context24.sent;
            // Gửi yêu cầu với userId không tồn tại

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Không tìm thấy người dùng");
          case 7:
          case "end":
            return _context24.stop();
        }
      }, _callee24);
    })));
    it("Trả về 200 nếu người dùng tồn tại", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee25() {
      var mockUser, response;
      return _regeneratorRuntime().wrap(function _callee25$(_context25) {
        while (1) switch (_context25.prev = _context25.next) {
          case 0:
            mockUser = {
              id: "1",
              username: "user1",
              email: "user1@example.com",
              role: "user"
            }; // Mock `getProfile` trả về thông tin người dùng
            _userServices.getProfile.mockResolvedValue(mockUser);
            _context25.next = 4;
            return (0, _supertest["default"])(_index["default"]).get("/api/user/admin/1");
          case 4:
            response = _context25.sent;
            // Gửi yêu cầu với userId hợp lệ

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Chi tiết người dùng.");
            expect(response.body.data).toEqual(mockUser);
          case 9:
          case "end":
            return _context25.stop();
        }
      }, _callee25);
    })));
  });
  describe("PUT /api/user/admin/:userId", function () {
    it("Trả về 400 nếu không gửi dữ liệu cập nhật", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee26() {
      var response;
      return _regeneratorRuntime().wrap(function _callee26$(_context26) {
        while (1) switch (_context26.prev = _context26.next) {
          case 0:
            _context26.next = 2;
            return (0, _supertest["default"])(_index["default"]).put("/api/user/admin/1").send({});
          case 2:
            response = _context26.sent;
            // Không có dữ liệu cập nhật

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Thông tin cập nhật là bắt buộc");
          case 6:
          case "end":
            return _context26.stop();
        }
      }, _callee26);
    })));
    it("Trả về 500 nếu cập nhật thông tin thất bại", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee27() {
      var response;
      return _regeneratorRuntime().wrap(function _callee27$(_context27) {
        while (1) switch (_context27.prev = _context27.next) {
          case 0:
            // Mock `updateProfile` trả về null
            _userServices.updateProfile.mockResolvedValue(null);
            _context27.next = 3;
            return (0, _supertest["default"])(_index["default"]).put("/api/user/admin/1").send({
              username: "user1",
              email: "user1@example.com"
            });
          case 3:
            response = _context27.sent;
            // Dữ liệu cập nhật

            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Có xảy ra lỗi hệ thống khi cập nhật thông tin");
          case 7:
          case "end":
            return _context27.stop();
        }
      }, _callee27);
    })));
    it("Trả về 200 nếu thông tin người dùng được cập nhật thành công", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee28() {
      var mockUpdatedUser, response;
      return _regeneratorRuntime().wrap(function _callee28$(_context28) {
        while (1) switch (_context28.prev = _context28.next) {
          case 0:
            mockUpdatedUser = {
              id: "1",
              username: "user1",
              email: "user1@example.com"
            }; // Mock `updateProfile` trả về thông tin người dùng đã được cập nhật
            _userServices.updateProfile.mockResolvedValue(mockUpdatedUser);
            _context28.next = 4;
            return (0, _supertest["default"])(_index["default"]).put("/api/user/admin/1").send({
              username: "user1",
              email: "user1@example.com"
            });
          case 4:
            response = _context28.sent;
            // Dữ liệu cập nhật

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Cập nhật thông tin người dùng thành công");
            expect(response.body.data).toEqual(mockUpdatedUser);
          case 9:
          case "end":
            return _context28.stop();
        }
      }, _callee28);
    })));
  });
  describe("DELETE /api/user/admin/:userId", function () {
    it("Trả về 404 nếu người dùng không tồn tại", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee29() {
      var response;
      return _regeneratorRuntime().wrap(function _callee29$(_context29) {
        while (1) switch (_context29.prev = _context29.next) {
          case 0:
            // Mock `removeUser` trả về null (người dùng không tồn tại)
            _userServices.removeUser.mockResolvedValue(null);
            _context29.next = 3;
            return (0, _supertest["default"])(_index["default"])["delete"]("/api/user/admin/999");
          case 3:
            response = _context29.sent;
            // Gửi yêu cầu DELETE với userId không tồn tại

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Người dùng không tồn tại");
          case 7:
          case "end":
            return _context29.stop();
        }
      }, _callee29);
    })));
    it("Trả về 200 nếu xóa người dùng thành công", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee30() {
      var mockDeletedUser, response;
      return _regeneratorRuntime().wrap(function _callee30$(_context30) {
        while (1) switch (_context30.prev = _context30.next) {
          case 0:
            mockDeletedUser = {
              id: "1",
              username: "user1",
              email: "user1@example.com"
            }; // Mock `removeUser` trả về thông tin người dùng đã xóa
            _userServices.removeUser.mockResolvedValue(mockDeletedUser);
            _context30.next = 4;
            return (0, _supertest["default"])(_index["default"])["delete"]("/api/user/admin/1");
          case 4:
            response = _context30.sent;
            // Gửi yêu cầu DELETE với userId hợp lệ

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Đã xóa người dùng thành công");
          case 8:
          case "end":
            return _context30.stop();
        }
      }, _callee30);
    })));
  });
});