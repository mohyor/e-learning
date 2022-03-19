"use strict";

var express = require('express');

var queryString = require('query-string');

var router = express.Router();

var User = require('../models/user');

var Course = require('../models/course');

var _require = require('../middleware'),
    isInstructor = _require.isInstructor,
    isAuth = _require.isAuth,
    instructorById = _require.instructorById;

router.param('userId', instructorById);
router.get('/instructor/:userId', isAuth, function (req, res) {
  res.json({
    user: req.profile
  });
});
router.get('/instructor-courses', isAuth, function _callee(req, res) {
  var courses;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Course.find({
            instructor: req.user._id
          }).sort({
            createdAt: -1
          }).exec());

        case 3:
          courses = _context.sent;
          res.json(courses);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post('/instructor/student-count', isAuth, function _callee2(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.find({
            courses: req.body.courseId
          }).select('_id').exec());

        case 3:
          users = _context2.sent;
          res.json(users);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;