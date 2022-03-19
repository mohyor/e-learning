"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.loginCall = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _AuthActions = require("./AuthActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loginCall = function loginCall(userCredential, dispatch) {
  var res;
  return regeneratorRuntime.async(function loginCall$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dispatch({
            type: "LOGIN_START"
          });
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("api/login", userCredential));

        case 4:
          res = _context.sent;
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          dispatch({
            type: "LOGIN_FAILURE",
            payload: _context.t0
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.loginCall = loginCall;

var logout = function logout(dispatch) {
  var _ref, data;

  return regeneratorRuntime.async(function logout$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          dispatch((0, _AuthActions.Logout)());
          _context2.prev = 1;
          window.localStorage.removeItem('user');
          _context2.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].get('/api/logout'));

        case 5:
          _ref = _context2.sent;
          data = _ref.data;
          toast(data.message);
          history.push('/login');
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 11]]);
};

exports.logout = logout;