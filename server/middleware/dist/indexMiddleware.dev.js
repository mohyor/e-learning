"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEnrolled = exports.isInstructor = exports.userById = exports.isAuth = exports.requireSignin = void 0;

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _courseModel = _interopRequireDefault(require("../models/courseModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expressJwt = require('express-jwt');

/*
export const requireSignin = jwt({
 getToken: (req, res) => req.cookies.token, secret: process.env.JWT_SECRET, algorithms: ["HS256"]
})

exports.isAdmin = (req, res, next) => {
 if (req.profile.role === 0) { return res.status(403).json({ error: 'Admin resource! Access denied'})}
 next();
};
*/
var requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth',
  algorithms: ['HS256']
});
exports.requireSignin = requireSignin;

var isAuth = function isAuth(req, res, next) {
  var user = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!user) {
    return res.status(403).json({
      error: 'Access denied'
    });
  }

  next();
};

exports.isAuth = isAuth;

var userById = function userById(req, res, next, id) {
  _userModel["default"].findById(id).exec(function (err, user) {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }

    req.profile = user;
    next();
  });
};

exports.userById = userById;

var isInstructor = function isInstructor(req, res, next, id) {
  var user;
  return regeneratorRuntime.async(function isInstructor$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_userModel["default"].findById(id).exec());

        case 3:
          user = _context.sent;

          if (user.role.includes('Instructor')) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.sendStatus(403));

        case 8:
          next();

        case 9:
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.isInstructor = isInstructor;

var isEnrolled = function isEnrolled(req, res, next) {
  var user, course, ids, i;
  return regeneratorRuntime.async(function isEnrolled$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_userModel["default"].findById(req.user._id).exec());

        case 3:
          user = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(_courseModel["default"].findOne({
            slug: req.params.slug
          }).exec());

        case 6:
          course = _context2.sent;
          ids = [];

          for (i = 0; i < user.courses.length; i++) {
            ids.push(user.courses[i].toString());
          }

          if (!ids.includes(course._id.toString())) {
            res.sendStatus(403);
          } else {
            next();
          }

          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
};
/*
export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check current user
export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
}
*/


exports.isEnrolled = isEnrolled;