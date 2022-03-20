"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserProfile = exports.getUserDetails = exports.register = exports.logout = exports.login = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _userConstants = require("../constants/userConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var login = function login(email, password) {
  return function _callee(dispatch) {
    var config, res;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch({
              type: _userConstants.USER_LOGIN_REQUEST
            });
            config = {
              headers: {
                'Content-Type': 'application/json'
              }
            };
            _context.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].post('/api/login', {
              email: email,
              password: password
            }, config));

          case 5:
            res = _context.sent;
            dispatch({
              type: _userConstants.USER_LOGIN_SUCCESS,
              payload: res.data
            });
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            dispatch({
              type: _userConstants.USER_LOGIN_FAIL,
              payload: _context.t0.response && _context.t0.response.data.message ? _context.t0.response.data.message : _context.t0.message
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 10]]);
  };
};

exports.login = login;

var logout = function logout() {
  return function (dispatch) {
    localStorage.removeItem('userInfo');
    dispatch({
      type: USER_LOGOUT
    });
  };
};

exports.logout = logout;

var register = function register(name, email, password) {
  return function _callee2(dispatch) {
    var config, res;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            dispatch({
              type: _userConstants.USER_REGISTER_REQUEST
            });
            config = {
              headers: {
                'Content-Type': 'application/json'
              }
            };
            _context2.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].post('/api/register', {
              name: name,
              email: email,
              password: password
            }, config));

          case 5:
            res = _context2.sent;
            dispatch({
              type: _userConstants.USER_REGISTER_SUCCESS,
              payload: res.data
            });
            dispatch({
              type: _userConstants.USER_LOGIN_SUCCESS,
              payload: res.data
            });
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            dispatch({
              type: _userConstants.USER_REGISTER_FAIL,
              payload: _context2.t0.response && _context2.t0.response.data.message ? _context2.t0.response.data.message : _context2.t0.message
            });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 11]]);
  };
};

exports.register = register;

var getUserDetails = function getUserDetails(id) {
  return function _callee3(dispatch, getState) {
    var _getState, userInfo, config, res;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            dispatch({
              type: _userConstants.USER_DETAILS_REQUEST
            });
            _getState = getState(), userInfo = _getState.userLogin.userInfo;
            config = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context3.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/user/".concat(id), config));

          case 6:
            res = _context3.sent;
            dispatch({
              type: _userConstants.USER_DETAILS_SUCCESS,
              payload: res.data
            });
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            dispatch({
              type: _userConstants.USER_DETAILS_FAIL,
              payload: _context3.t0.response && _context3.t0.response.data.message ? _context3.t0.response.data.message : _context3.t0.message
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 10]]);
  };
};

exports.getUserDetails = getUserDetails;

var updateUserProfile = function updateUserProfile(user) {
  return function _callee4(dispatch, getState) {
    var _getState2, userInfo, config, res;

    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            dispatch({
              type: _userConstants.USER_UPDATE_PROFILE_REQUEST
            });
            _getState2 = getState(), userInfo = _getState2.userLogin.userInfo;
            config = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context4.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].put("/api/user/".concat(id), user, config));

          case 6:
            res = _context4.sent;
            dispatch({
              type: _userConstants.USER_UPDATE_PROFILE_SUCCESS,
              payload: res.data
            });
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            dispatch({
              type: _userConstants.USER_UPDATE_PROFILE_FAIL,
              payload: _context4.t0.response && _context4.t0.response.data.message ? _context4.t0.response.data.message : _context4.t0.message
            });

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 10]]);
  };
};

exports.updateUserProfile = updateUserProfile;