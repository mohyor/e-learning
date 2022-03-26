"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCourseReview = exports.listCourseDetails = exports.listCourses = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _courseConstants = require("../constants/courseConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var listCourses = function listCourses() {
  return function _callee(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch({
              type: _courseConstants.COURSE_LIST_REQUEST
            });
            _context.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].get('/api/courses'));

          case 4:
            res = _context.sent;
            dispatch({
              type: _courseConstants.COURSE_LIST_SUCCESS,
              payload: res.data
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            dispatch({
              type: _courseConstants.COURSE_LIST_FAIL,
              payload: _context.t0.response && _context.t0.response.data.message ? _context.t0.response.data.message : _context.t0.message
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.listCourses = listCourses;

var listCourseDetails = function listCourseDetails(slug) {
  return function _callee2(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            dispatch({
              type: _courseConstants.COURSE_DETAILS_REQUEST
            });
            _context2.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/course/".concat(slug)));

          case 4:
            res = _context2.sent;
            dispatch({
              type: _courseConstants.COURSE_DETAILS_SUCCESS,
              payload: res.data
            });
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            dispatch({
              type: _courseConstants.COURSE_DETAILS_FAIL,
              payload: _context2.t0.response && _context2.t0.response.data.message ? _context2.t0.response.data.message : _context2.t0.message
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.listCourseDetails = listCourseDetails;

var createCourseReview = function createCourseReview(courseId, review) {
  return function _callee3(dispatch, getState) {
    var _getState, userInfo, config;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            dispatch({
              type: _courseConstants.COURSE_CREATE_REVIEW_REQUEST
            });
            _getState = getState(), userInfo = _getState.userLogin.userInfo;
            config = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context3.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].put("/api/course/".concat(courseId, "/review"), review, config));

          case 6:
            dispatch({
              type: _courseConstants.COURSE_CREATE_REVIEW_SUCCESS
            });
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            dispatch({
              type: _courseConstants.COURSE_CREATE_REVIEW_FAIL,
              payload: _context3.t0.response && _context3.t0.response.data.message ? _context3.t0.response.data.message : _context3.t0.message
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
};

exports.createCourseReview = createCourseReview;