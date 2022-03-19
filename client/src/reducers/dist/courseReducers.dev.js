"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.courseDetailsReducer = exports.courseListReducer = void 0;

var _courseConstants = require("../constants/courseConstants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var courseListReducer = function courseListReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    courses: []
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _courseConstants.COURSE_LIST_REQUEST:
      return {
        loading: true,
        courses: []
      };

    case _courseConstants.COURSE_LIST_SUCCESS:
      return {
        loading: false,
        courses: action.payload
      };

    case _courseConstants.COURSE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

exports.courseListReducer = courseListReducer;

var courseDetailsReducer = function courseDetailsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    course: {
      reviews: []
    }
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _courseConstants.COURSE_DETAILS_REQUEST:
      return _objectSpread({
        loading: true
      }, state);

    case _courseConstants.COURSE_DETAILS_SUCCESS:
      return {
        loading: false,
        course: action.payload
      };

    case _courseConstants.COURSE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

exports.courseDetailsReducer = courseDetailsReducer;