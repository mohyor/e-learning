"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userCourses = void 0;

var userCourses = function userCourses(userId, token) {
  var response, json;
  return regeneratorRuntime.async(function userCourses$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("api/user-courses/".concat(userId), {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer ".concat(token)
            }
          }));

        case 2:
          response = _context.sent;

          if (!(response.statusCode === 200)) {
            _context.next = 10;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          json = _context.sent;
          return _context.abrupt("return", json);

        case 10:
          throw new Error(response.status);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.userCourses = userCourses;