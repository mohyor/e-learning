"use strict";

//const jwt = require('express-jwt')
var jwt = require('jsonwebtoken');

var User = require('../models/user');

var Course = require('../models/course');

var Category = require('../models/category');
/*
  exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) { return res.status(403).json({ error: 'Admin resource! Access denied'})}
  next();
  };
*/


exports.isAuth = function (req, res, next) {
  var authHeader = req.headers['authorization'];
  var token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}; //exports.requireSignin = jwt({ secret: process.env.JWT_SECRET, userProperty: 'auth', algorithms: ['HS256']})

/*
exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id
  //if (!user) { return res.status(403).json({ error: 'Access denied'})}
  //if (err) { console.log(err)}
  next()
}
*/


exports.userById = function (req, res, next, id) {
  User.findById(id).exec(function (err, user) {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }

    req.profile = user;
    next();
  });
};

exports.categoryById = function (req, res, next, id) {
  Category.findById(id).exec(function (err, category) {
    if (err || !category) {
      return res.status(400).json({
        error: 'Category does not exist'
      });
    }

    req.category = category;
    next();
  });
};

exports.reviewById = function (req, res, next, id) {
  Review.findById(id).exec(function (err, review) {
    if (err || !review) {
      return res.status(400).json({
        error: 'Review does not exist'
      });
    }

    req.review = review;
    next();
  });
};

exports.courseById = function (req, res, next, id) {
  Course.findById(id).populate('category').exec(function (err, course) {
    if (err || !course) {
      return res.status(400).json({
        error: "Course doesn't exist"
      });
    }

    req.course = course;
    next();
  });
};

exports.instructorById = function (req, res, next, id) {
  User.findById(id).exec(function (err, user) {
    if (!user.role.includes('Instructor')) {
      console.log("Instructor: ", user);
      return res.sendStatus(403);
    } else {
      res.json({
        ok: true
      });
    }

    req.profile = user;
    next();
  });
};

exports.isInstructor = function _callee(req, res, next, id) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.findById(id).exec());

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

exports.isEnrolled = function _callee2(req, res, next) {
  var user, course, ids, i;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user._id).exec());

        case 3:
          user = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(Course.findOne({
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