"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnFollow = exports.Follow = exports.Logout = exports.LoginFailure = exports.LoginSuccess = exports.LoginStart = void 0;

var LoginStart = function LoginStart(userCredentials) {
  return {
    type: "LOGIN_START"
  };
};

exports.LoginStart = LoginStart;

var LoginSuccess = function LoginSuccess(user) {
  return {
    type: "LOGIN_SUCCESS",
    payload: user
  };
};
/*
export const LoggedInUserData = (user, id) => ({ 
 type: "LOGGED_IN_USER_DATA", payload: user: { id: user.id } 
})    
*/


exports.LoginSuccess = LoginSuccess;

var LoginFailure = function LoginFailure(error) {
  return {
    type: "LOGIN_FAILURE",
    payload: error
  };
};

exports.LoginFailure = LoginFailure;

var Logout = function Logout(user) {
  return {
    type: "LOGOUT",
    payload: user
  };
};

exports.Logout = Logout;

var Follow = function Follow(userId) {
  return {
    type: "FOLLOW",
    payload: userId
  };
};

exports.Follow = Follow;

var UnFollow = function UnFollow(userId) {
  return {
    type: "UNFOLLOW",
    payload: userId
  };
};

exports.UnFollow = UnFollow;