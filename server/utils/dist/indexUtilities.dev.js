"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comparePassword = exports.hashPassword = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var hashPassword = function hashPassword(password) {
  return new Promise(function (resolve, reject) {
    _bcrypt["default"].genSalt(12, function (err, salt) {
      if (err) {
        reject(err);
      }

      _bcrypt["default"].hash(password, salt, function (err, hash) {
        if (err) {
          reject(err);
        }

        resolve(hash);
      });
    });
  });
};

exports.hashPassword = hashPassword;

var comparePassword = function comparePassword(password, hashed) {
  return _bcrypt["default"].compare(password, hashed);
};

exports.comparePassword = comparePassword;