"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userDeleteReducer = exports.userUpdateReducer = exports.userListReducer = exports.userUpdateProfileReducer = exports.userDetailsReducer = exports.userRegisterReducer = exports.userLoginReducer = void 0;

var _userConstants = require("../constants/userConstants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var userLoginReducer = function userLoginReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _userConstants.USER_LOGIN_REQUEST:
      return {
        loading: true,
        isFetching: true
      };

    case _userConstants.USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        isFetching: false
      };

    case _userConstants.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
        isFetching: false
      };

    case _userConstants.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

exports.userLoginReducer = userLoginReducer;

var userRegisterReducer = function userRegisterReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _userConstants.USER_REGISTER_REQUEST:
      return {
        loading: true,
        isFetching: true
      };

    case _userConstants.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        isFetching: false
      };

    case _userConstants.USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
        isFetching: false
      };

    default:
      return state;
  }
};

exports.userRegisterReducer = userRegisterReducer;

var userDetailsReducer = function userDetailsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    user: {}
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _userConstants.USER_DETAILS_REQUEST:
      return _objectSpread({}, state, {
        loading: true,
        isFetching: true
      });

    case _userConstants.USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        isFetching: false
      };

    case _userConstants.USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
        isFetching: false
      };

    default:
      return state;
  }
};

exports.userDetailsReducer = userDetailsReducer;

var userUpdateProfileReducer = function userUpdateProfileReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _userConstants.USER_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
        isFetching: true
      };

    case _userConstants.USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
        isFetching: false
      };

    case _userConstants.USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
        isFetching: false
      };

    default:
      return state;
  }
};

exports.userUpdateProfileReducer = userUpdateProfileReducer;

var userListReducer = function userListReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    users: []
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _userConstants.USER_LIST_REQUEST:
      return {
        loading: true
      };

    case _userConstants.USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload
      };

    case _userConstants.USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    case _userConstants.USER_LIST_RESET:
      return {
        users: []
      };

    default:
      return state;
  }
};

exports.userListReducer = userListReducer;

var userUpdateReducer = function userUpdateReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    user: {}
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _userConstants.USER_UPDATE_REQUEST:
      return {
        loading: true
      };

    case _userConstants.USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true
      };

    case _userConstants.USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    case _userConstants.USER_UPDATE_RESET:
      return {
        user: {}
      };

    default:
      return state;
  }
};

exports.userUpdateReducer = userUpdateReducer;

var userDeleteReducer = function userDeleteReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _userConstants.USER_DELETE_REQUEST:
      return {
        loading: true
      };

    case _userConstants.USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true
      };

    case _userConstants.USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

exports.userDeleteReducer = userDeleteReducer;