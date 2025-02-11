"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnBook = exports.getTransactionDetails = exports.getBorrowHistory = exports.getAllTransactions = exports.extendBorrowing = exports.deleteTransaction = exports.borrowBook = void 0;
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
var _bookServices = require("../services/book.services.js");
var _transactionServices = require("../services/transaction.services.js");
var _userServices = require("../services/user.services.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var borrowBook = exports.borrowBook = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var book_id, _id, book, due_date, data, transaction;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          book_id = req.body.book_id;
          _id = req.user._id;
          _context.next = 4;
          return (0, _bookServices.getBook)(book_id);
        case 4:
          book = _context.sent;
          if (!(!book || book.available_copies <= 0)) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            success: false,
            message: "Sách không khả dụng."
          }));
        case 7:
          due_date = new Date();
          due_date.setDate(due_date.getDate() + 7);
          data = {
            user_id: _id,
            book_id: book_id,
            due_date: due_date
          };
          _context.next = 12;
          return (0, _transactionServices.borrowBookUser)(data);
        case 12:
          transaction = _context.sent;
          book.available_copies -= 1;
          _context.next = 16;
          return book.save();
        case 16:
          _context.next = 18;
          return (0, _userServices.addBorrowed)(_id, book_id);
        case 18:
          _context.next = 20;
          return (0, _userServices.addHistoryBorrowed)(_id, transaction._id);
        case 20:
          return _context.abrupt("return", res.status(200).json({
            success: true,
            message: "Mượn sách thành công.",
            transaction: transaction
          }));
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var returnBook = exports.returnBook = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var book_id, _id, data, transaction, today, book;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          book_id = req.body.book_id;
          _id = req.user._id;
          data = {
            user_id: _id,
            book_id: book_id,
            status: "mượn"
          };
          _context2.next = 5;
          return (0, _transactionServices.getborrowBookUser)(data);
        case 5:
          transaction = _context2.sent;
          if (transaction) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            success: false,
            message: "Không tìm thấy giao dịch."
          }));
        case 8:
          transaction.return_date = new Date();
          transaction.status = "đã trả";
          today = new Date();
          if (transaction.due_date < today) {
            transaction.fine = Math.ceil((today - transaction.due_date) / (1000 * 60 * 60 * 24));
          }
          _context2.next = 14;
          return transaction.save();
        case 14:
          _context2.next = 16;
          return (0, _bookServices.getBook)(book_id);
        case 16:
          book = _context2.sent;
          book.available_copies += 1;
          _context2.next = 20;
          return book.save();
        case 20:
          _context2.next = 22;
          return (0, _userServices.removeBorrowed)(_id, book_id);
        case 22:
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            message: "Trả sách thành công."
          }));
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var extendBorrowing = exports.extendBorrowing = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var book_id, _id, data, transaction, book;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          book_id = req.body.book_id;
          _id = req.user._id;
          data = {
            user_id: _id,
            book_id: book_id,
            status: "mượn"
          };
          _context3.next = 5;
          return (0, _transactionServices.getborrowBookUser)(data);
        case 5:
          transaction = _context3.sent;
          if (transaction) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Không tìm thấy giao dịch."
          }));
        case 8:
          _context3.next = 10;
          return (0, _bookServices.getBook)(book_id);
        case 10:
          book = _context3.sent;
          if (!(book.reserved_copies > 0)) {
            _context3.next = 13;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Sách đã được đặt trước bởi người khác."
          }));
        case 13:
          transaction.due_date = new Date(transaction.due_date.setDate(transaction.due_date.getDate() + 7));
          _context3.next = 16;
          return transaction.save();
        case 16:
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            message: "Gia hạn mượn sách thành công.",
            transaction: transaction
          }));
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var getBorrowHistory = exports.getBorrowHistory = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _id, history;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _id = req.user._id;
          _context4.next = 3;
          return (0, _transactionServices.getHistoryBorrowBooked)(_id);
        case 3:
          history = _context4.sent;
          return _context4.abrupt("return", res.status(history ? 200 : 404).json({
            success: history ? true : false,
            message: history ? "Danh sách lịch sử mượn sách." : "Không tìm thấy danh sách mượn",
            data: history
          }));
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var getAllTransactions = exports.getAllTransactions = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var transactions;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _transactionServices.getTransactions)();
        case 2:
          transactions = _context5.sent;
          return _context5.abrupt("return", res.status(transactions ? 200 : 404).json({
            success: transactions ? true : false,
            message: transactions ? "Danh sách giao dịch." : "Giao dịch không tồn tại.",
            transactions: transactions
          }));
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
var getTransactionDetails = exports.getTransactionDetails = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var transactionId, transaction;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          transactionId = req.params.transactionId;
          _context6.next = 3;
          return (0, _transactionServices.getTransactionById)(transactionId);
        case 3:
          transaction = _context6.sent;
          return _context6.abrupt("return", res.status(transaction ? 200 : 404).json({
            success: transaction ? true : false,
            message: transaction ? "Chi tiết giao dịch." : "Giao dịch không tồn tại.",
            transaction: transaction
          }));
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
var deleteTransaction = exports.deleteTransaction = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var transactionId, transaction;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          transactionId = req.params.transactionId;
          _context7.next = 3;
          return (0, _transactionServices.deleteTransactionById)(transactionId);
        case 3:
          transaction = _context7.sent;
          return _context7.abrupt("return", res.status(transaction ? 200 : 404).json({
            success: transaction ? true : false,
            message: transaction ? "Xóa giao dịch thành công." : "Giao dịch không tồn tại."
          }));
        case 5:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());