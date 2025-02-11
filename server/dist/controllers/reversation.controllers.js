"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateReservationStatus = exports.reserveBook = exports.getReservations = exports.getReservationDetails = exports.getAllReservations = exports.deleteReservation = exports.cancelBookReservation = void 0;
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
var _bookServices = require("../services/book.services.js");
var _userServices = require("../services/user.services.js");
var _reservationServices = require("../services/reservation.services.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var reserveBook = exports.reserveBook = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var book_id, _id, book, expiry_date, data, reservation;
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
          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Sách không khả dụng."
          }));
        case 7:
          expiry_date = new Date();
          expiry_date.setDate(expiry_date.getDate() + 3);
          data = {
            user_id: _id,
            book_id: book_id,
            expiry_date: expiry_date
          };
          _context.next = 12;
          return (0, _reservationServices.createReservation)(data);
        case 12:
          reservation = _context.sent;
          if (reservation) {
            _context.next = 15;
            break;
          }
          return _context.abrupt("return", res.status(500).json({
            success: false,
            message: "Đặt sách không thành công."
          }));
        case 15:
          book.reserved_copies += 1;
          book.available_copies -= 1;
          _context.next = 19;
          return book.save();
        case 19:
          _context.next = 21;
          return (0, _userServices.addReversationBook)(_id, reservation._id);
        case 21:
          return _context.abrupt("return", res.status(200).json({
            success: true,
            message: "Đặt sách trước thành công.",
            reservation: reservation
          }));
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var getReservations = exports.getReservations = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _id, data, reservations;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _id = req.user._id;
          data = {
            user_id: _id
          };
          _context2.next = 4;
          return (0, _reservationServices.getUserReservations)(data);
        case 4:
          reservations = _context2.sent;
          return _context2.abrupt("return", res.status(reservations ? 200 : 404).json({
            success: reservations ? true : false,
            message: reservations ? "Danh sách sách đã đặt trước." : "Không tìm thấy danh sách đặt trước.",
            reservations: reservations
          }));
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var cancelBookReservation = exports.cancelBookReservation = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var reservationId, _id, reservation, now, reservationExpiryDate, book;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          reservationId = req.params.reservationId;
          _id = req.user._id;
          _context3.next = 4;
          return (0, _reservationServices.getUserReservationById)(reservationId);
        case 4:
          reservation = _context3.sent;
          if (reservation) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            success: false,
            message: "Không tìm thấy yêu cầu đặt trước."
          }));
        case 7:
          now = new Date();
          reservationExpiryDate = new Date(reservation.expiry_date).getDate();
          if (!(now.getDate() > reservationExpiryDate)) {
            _context3.next = 11;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: "Không thể hủy vì yêu cầu đã vượt hạn 3 ngày."
          }));
        case 11:
          _context3.next = 13;
          return (0, _bookServices.getBook)(reservation.book_id);
        case 13:
          book = _context3.sent;
          book.reserved_copies -= 1;
          book.available_copies += 1;
          _context3.next = 18;
          return book.save();
        case 18:
          _context3.next = 20;
          return (0, _userServices.removeReversationBook)(_id, reservation._id);
        case 20:
          _context3.next = 22;
          return (0, _reservationServices.cancelReservation)(reservationId);
        case 22:
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            message: "Hủy yêu cầu đặt trước thành công."
          }));
        case 23:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var getAllReservations = exports.getAllReservations = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var status, query, reservations;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          status = req.query.status;
          query = {};
          if (status) query.status = status;
          _context4.next = 5;
          return (0, _reservationServices.getAllReservation)(query);
        case 5:
          reservations = _context4.sent;
          return _context4.abrupt("return", res.status(reservations ? 200 : 404).json({
            success: reservations ? true : false,
            message: reservations ? "Danh sách yêu cầu đặt trước." : "Yêu cầu đặt trước không tìm thấy",
            reservations: reservations ? reservations : ""
          }));
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var getReservationDetails = exports.getReservationDetails = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var reservationId, reservation;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          reservationId = req.params.reservationId;
          _context5.next = 3;
          return (0, _reservationServices.getUserReservationById)(reservationId);
        case 3:
          reservation = _context5.sent;
          return _context5.abrupt("return", res.status(reservation ? 200 : 404).json({
            success: reservation ? true : false,
            message: reservation ? "Chi tiết yêu cầu đặt trước." : "Yêu cầu đặt trước không tìm thấy",
            reservation: reservation
          }));
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
var deleteReservation = exports.deleteReservation = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var reservationId, reservation;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          reservationId = req.params.reservationId;
          _context6.next = 3;
          return (0, _reservationServices.deleteReservationById)(reservationId);
        case 3:
          reservation = _context6.sent;
          return _context6.abrupt("return", res.status(reservation ? 200 : 404).json({
            success: reservation ? true : false,
            message: reservation ? "Xóa yêu cầu đặt trước thành công." : "Yêu cầu đặt trước không tìm thấy."
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
var updateReservationStatus = exports.updateReservationStatus = (0, _expressAsyncHandler["default"])(/*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var reservationId, status, validStatuses, isReservation, book, reservation;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          reservationId = req.params.reservationId;
          status = req.body.status;
          validStatuses = ["chờ đợi", "hoàn thành", "hủy"];
          if (validStatuses.includes(status)) {
            _context7.next = 5;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            success: false,
            message: "Trạng thái không hợp lệ."
          }));
        case 5:
          _context7.next = 7;
          return (0, _reservationServices.getUserReservationById)(reservationId);
        case 7:
          isReservation = _context7.sent;
          if (!(status == "hủy")) {
            _context7.next = 18;
            break;
          }
          _context7.next = 11;
          return (0, _bookServices.getBook)(isReservation.book_id);
        case 11:
          book = _context7.sent;
          book.reserved_copies -= 1;
          book.available_copies += 1;
          _context7.next = 16;
          return book.save();
        case 16:
          _context7.next = 18;
          return (0, _userServices.removeReversationBook)(isReservation.user_id, isReservation._id);
        case 18:
          _context7.next = 20;
          return (0, _reservationServices.updateReservationByStatus)(reservationId, status);
        case 20:
          reservation = _context7.sent;
          return _context7.abrupt("return", res.status(reservation ? 200 : 404).json({
            success: reservation ? true : false,
            message: reservation ? "Cập nhật trạng thái thành công." : "Yêu cầu đặt trước không tìm thấy",
            reservation: reservation
          }));
        case 22:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());