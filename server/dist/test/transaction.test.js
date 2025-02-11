"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _setTest = require("../../setTest");
var _supertest = _interopRequireDefault(require("supertest"));
var _index = _interopRequireWildcard(require("../../index"));
var _transactionServices = require("../../src/services/transaction.services.js");
var _bookServices = require("../../src/services/book.services.js");
var _userServices = require("../../src/services/user.services.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
jest.mock("../../src/services/transaction.services.js"); // Mock các service
jest.mock("../../src/services/book.services.js"); // Mock các service
jest.mock("../../src/services/user.services.js"); // Mock các service
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
})));
describe("Transaction", function () {
  beforeEach(function () {
    jest.clearAllMocks();
  });
  describe("POST /api/transaction/borrow", function () {
    it("Trả về 404 nếu sách không khả dụng", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var response;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _bookServices.getBook.mockResolvedValue({
              id: "book1",
              available_copies: 0
            });
            _context3.next = 3;
            return (0, _supertest["default"])(_index["default"]).post("/api/transaction/borrow").send({
              book_id: "book1"
            });
          case 3:
            response = _context3.sent;
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Sách không khả dụng.");
          case 7:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    })));
    it("Trả về 200 nếu mượn sách thành công", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var mockBook, mockTransaction, response;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            mockBook = {
              id: "book1",
              available_copies: 5,
              save: jest.fn()
            };
            mockTransaction = {
              id: "trans1",
              user_id: "user1",
              book_id: "book1",
              due_date: new Date().toISOString()
            };
            _bookServices.getBook.mockResolvedValue(mockBook);
            _transactionServices.borrowBookUser.mockResolvedValue(mockTransaction);
            _userServices.addBorrowed.mockResolvedValue(true);
            _userServices.addHistoryBorrowed.mockResolvedValue(true);
            _context4.next = 8;
            return (0, _supertest["default"])(_index["default"]).post("/api/transaction/borrow").send({
              book_id: "book1"
            });
          case 8:
            response = _context4.sent;
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Mượn sách thành công.");
            expect(response.body.transaction).toEqual(mockTransaction);
          case 13:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    })));
  });
  describe("POST /api/transaction/return", function () {
    it("Trả về 400 nếu không tìm thấy giao dịch", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var response;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            // Mock `getborrowBookUser` trả về null (không tìm thấy giao dịch)
            _transactionServices.getborrowBookUser.mockResolvedValue(null);
            _context5.next = 3;
            return (0, _supertest["default"])(_index["default"]).post("/api/transaction/return").send({
              book_id: "book1"
            });
          case 3:
            response = _context5.sent;
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Không tìm thấy giao dịch.");
          case 7:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    })));

    // it("Tính tiền phạt nếu trả sách trễ", async () => {
    //   const lateDate = new Date();
    //   lateDate.setDate(lateDate.getDate() - 10); // 10 ngày trễ

    //   const mockTransaction = {
    //     user_id: "user1",
    //     book_id: "book1",
    //     status: "mượn",
    //     due_date: lateDate,
    //     return_date: null,
    //     fine: 0,
    //   };

    //   const mockBook = {
    //     id: "book1",
    //     available_copies: 5,
    //     save: jest.fn(),
    //   };

    //   getborrowBookUser.mockResolvedValue(mockTransaction);
    //   getBook.mockResolvedValue(mockBook);
    //   removeBorrowed.mockResolvedValue();

    //   const response = await supertest(app)
    //     .post("/api/transaction/return")
    //     .send({ book_id: "book1" });

    //   expect(response.status).toBe(200);
    //   expect(response.body.transaction.fine).toBeGreaterThan(0); // Kiểm tra tiền phạt
    // });

    it("Trả về 200 nếu trả sách thành công", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var mockTransaction, mockBook, response;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            mockTransaction = {
              user_id: "user1",
              book_id: "book1",
              status: "mượn",
              due_date: new Date(),
              return_date: null,
              fine: 0,
              save: jest.fn()
            };
            mockBook = {
              id: "book1",
              available_copies: 5,
              save: jest.fn()
            }; // Mock `getborrowBookUser` trả về giao dịch mượn hợp lệ
            _transactionServices.getborrowBookUser.mockResolvedValue(mockTransaction);

            // Mock `getBook` trả về sách
            _bookServices.getBook.mockResolvedValue(mockBook);

            // Mock `removeBorrowed` không trả về gì vì chỉ cần xóa thông tin mượn
            _userServices.removeBorrowed.mockResolvedValue(true);
            _context6.next = 7;
            return (0, _supertest["default"])(_index["default"]).post("/api/transaction/return").send({
              book_id: "book1"
            });
          case 7:
            response = _context6.sent;
            // ID của sách muốn trả

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Trả sách thành công.");
          case 11:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    })));
  });
  describe("POST /api/transaction/extend", function () {
    it("Trả về 400 nếu giao dịch không tồn tại", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var response;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _transactionServices.getborrowBookUser.mockResolvedValue(null);
            _context7.next = 3;
            return (0, _supertest["default"])(_index["default"]).post("/api/transaction/extend").send({
              book_id: "book1"
            });
          case 3:
            response = _context7.sent;
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Không tìm thấy giao dịch.");
          case 7:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    })));
    it("Trả về 400 nếu sách đã được đặt trước", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var mockTransaction, mockBook, response;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            mockTransaction = {
              user_id: "user1",
              book_id: "book1",
              status: "mượn",
              due_date: new Date("2024-12-24"),
              save: jest.fn()
            };
            mockBook = {
              id: "book1",
              reserved_copies: 1 // Có người đặt trước
            };
            _transactionServices.getborrowBookUser.mockResolvedValue(mockTransaction);
            _bookServices.getBook.mockResolvedValue(mockBook);
            _context8.next = 6;
            return (0, _supertest["default"])(_index["default"]).post("/api/transaction/extend").send({
              book_id: "book1"
            });
          case 6:
            response = _context8.sent;
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Sách đã được đặt trước bởi người khác.");
            expect(mockTransaction.save).not.toHaveBeenCalled(); // Giao dịch không được lưu
          case 11:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    })));
    it("Trả về 200 nếu gia hạn mượn sách thành công", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
      var mockTransaction, mockBook, response;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            mockTransaction = {
              user_id: "user1",
              book_id: "book1",
              status: "mượn",
              due_date: new Date("2024-12-24"),
              save: jest.fn() // Mock save
            };
            mockBook = {
              id: "book1",
              reserved_copies: 0 // Không có người đặt trước
            }; // Mock các hàm phụ trợ

            _transactionServices.getborrowBookUser.mockResolvedValue(mockTransaction);
            _bookServices.getBook.mockResolvedValue(mockBook);
            _context9.next = 6;
            return (0, _supertest["default"])(_index["default"]).post("/api/transaction/extend").send({
              book_id: "book1"
            });
          case 6:
            response = _context9.sent;
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Gia hạn mượn sách thành công.");
            expect(mockTransaction.due_date).toEqual(new Date("2024-12-31")); // Ngày trả mới
            expect(mockTransaction.save).toHaveBeenCalled(); // Kiểm tra save đã được gọi
          case 12:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    })));
  });
  describe("GET /api/transaction/history", function () {
    it("Trả về 200 và danh sách lịch sử mượn sách nếu thành công", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
      var mockHistory, response;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            mockHistory = [{
              book_id: "book1",
              title: "Sách 1",
              borrow_date: "2024-12-01",
              return_date: "2024-12-10"
            }, {
              book_id: "book2",
              title: "Sách 2",
              borrow_date: "2024-12-05",
              return_date: null // Chưa trả sách
            }];
            _transactionServices.getHistoryBorrowBooked.mockResolvedValue(mockHistory);
            _context10.next = 4;
            return (0, _supertest["default"])(_index["default"]).get("/api/transaction/history");
          case 4:
            response = _context10.sent;
            // Đường dẫn API

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Danh sách lịch sử mượn sách.");
            expect(response.body.data).toEqual(mockHistory); // So sánh dữ liệu trả về
          case 9:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    })));
    it("Trả về 404 nếu không tìm thấy danh sách mượn sách", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
      var response;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _transactionServices.getHistoryBorrowBooked.mockResolvedValue(null);
            _context11.next = 3;
            return (0, _supertest["default"])(_index["default"]).get("/api/transaction/history");
          case 3:
            response = _context11.sent;
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Không tìm thấy danh sách mượn");
            expect(response.body.data).toBe(null);
          case 8:
          case "end":
            return _context11.stop();
        }
      }, _callee11);
    })));
  });
  describe("GET /api/transaction", function () {
    it("Trả về 404 nếu không tìm thấy giao dịch", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
      var response;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _transactionServices.getTransactions.mockResolvedValue(null);
            _context12.next = 3;
            return (0, _supertest["default"])(_index["default"]).get("/api/transaction");
          case 3:
            response = _context12.sent;
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Giao dịch không tồn tại.");
            expect(response.body.transactions).toBe(null);
          case 8:
          case "end":
            return _context12.stop();
        }
      }, _callee12);
    })));
    it("Trả về 200 và danh sách giao dịch nếu tồn tại", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
      var mockTransactions, response;
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            mockTransactions = [{
              id: "trans1",
              user_id: "user1",
              book_id: "book1",
              status: "đã trả",
              borrow_date: "2024-12-01",
              return_date: "2024-12-10"
            }, {
              id: "trans2",
              user_id: "user2",
              book_id: "book2",
              status: "mượn",
              borrow_date: "2024-12-05",
              return_date: null
            }];
            _transactionServices.getTransactions.mockResolvedValue(mockTransactions);
            _context13.next = 4;
            return (0, _supertest["default"])(_index["default"]).get("/api/transaction");
          case 4:
            response = _context13.sent;
            // Đường dẫn API

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Danh sách giao dịch.");
            expect(response.body.transactions).toEqual(mockTransactions);
          case 9:
          case "end":
            return _context13.stop();
        }
      }, _callee13);
    })));
  });
  describe("GET /api/transaction/:transactionId", function () {
    it("Trả về 404 nếu giao dịch không tồn tại", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
      var response;
      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _transactionServices.getTransactionById.mockResolvedValue(null);
            _context14.next = 3;
            return (0, _supertest["default"])(_index["default"]).get("/api/transaction/trans2");
          case 3:
            response = _context14.sent;
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Giao dịch không tồn tại.");
            expect(response.body.transaction).toBe(null);
          case 8:
          case "end":
            return _context14.stop();
        }
      }, _callee14);
    })));
    it("Trả về 200 và chi tiết giao dịch nếu giao dịch tồn tại", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
      var mockTransaction, response;
      return _regeneratorRuntime().wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            mockTransaction = {
              id: "trans1",
              user_id: "user1",
              book_id: "book1",
              status: "đã trả",
              borrow_date: "2024-12-01",
              return_date: "2024-12-10",
              fine: 0
            };
            _transactionServices.getTransactionById.mockResolvedValue(mockTransaction);
            _context15.next = 4;
            return (0, _supertest["default"])(_index["default"]).get("/api/transaction/trans1");
          case 4:
            response = _context15.sent;
            // Đường dẫn API

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Chi tiết giao dịch.");
            expect(response.body.transaction).toEqual(mockTransaction);
          case 9:
          case "end":
            return _context15.stop();
        }
      }, _callee15);
    })));
  });
  describe("DELETE /api/transaction/:transactionId", function () {
    it("Trả về 404 nếu giao dịch không tồn tại", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
      var response;
      return _regeneratorRuntime().wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _transactionServices.deleteTransactionById.mockResolvedValue(null);
            _context16.next = 3;
            return (0, _supertest["default"])(_index["default"])["delete"]("/api/transaction/trans2");
          case 3:
            response = _context16.sent;
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("Giao dịch không tồn tại.");
          case 7:
          case "end":
            return _context16.stop();
        }
      }, _callee16);
    })));
    it("Trả về 200 nếu xóa giao dịch thành công", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
      var mockTransaction, response;
      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            mockTransaction = {
              id: "trans1",
              user_id: "user1",
              book_id: "book1",
              status: "đã trả"
            };
            _transactionServices.deleteTransactionById.mockResolvedValue(mockTransaction);
            _context17.next = 4;
            return (0, _supertest["default"])(_index["default"])["delete"]("/api/transaction/trans1");
          case 4:
            response = _context17.sent;
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Xóa giao dịch thành công.");
          case 8:
          case "end":
            return _context17.stop();
        }
      }, _callee17);
    })));
  });
});