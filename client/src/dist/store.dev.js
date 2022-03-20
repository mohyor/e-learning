"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxDevtoolsExtension = require("redux-devtools-extension");

var _courseReducers = require("./reducers/courseReducers");

var _userReducers = require("./reducers/userReducers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reducer = (0, _redux.combineReducers)({
  courseList: _courseReducers.courseListReducer,
  courseDetails: _courseReducers.courseDetailsReducer,
  userLogin: _userReducers.userLoginReducer,
  userRegister: _userReducers.userRegisterReducer,
  userDetails: _userReducers.userDetailsReducer,
  userUpdateProfile: _userReducers.userUpdateProfileReducer
});
var userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
var initialState = {
  userLogin: {
    userInfo: userInfoFromStorage
  }
};
var middleware = [_reduxThunk["default"]];
var store = (0, _redux.createStore)(reducer, initialState, (0, _reduxDevtoolsExtension.composeWithDevTools)(_redux.applyMiddleware.apply(void 0, middleware)));
var _default = store;
exports["default"] = _default;