"use strict";

var bcrypt = require('bcrypt');

exports.hashPassword = function (password) {
  return new Promise(function (resolve, reject) {
    bcrypt.genSalt(12, function (err, salt) {
      if (err) {
        reject(err);
      }

      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          reject(err);
        }

        resolve(hash);
      });
    });
  });
};

exports.comparePassword = function (password, hashed) {
  return bcrypt.compare(password, hashed);
};