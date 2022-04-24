"use strict";

var jwt = require('jsonwebtoken');

var User = require('../models/user');

var Course = require('../models/course');

var Category = require('../models/category');

exports.isAuth = function (req, res, next) {
  var authHeader = req.headers['authorization'];
  var token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

exports.checkAuth = function _callee(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))) {
            _context.next = 15;
            break;
          }

          _context.prev = 1;
          token = req.headers.authorization.split(' ')[1];
          decoded = jwt.verify(token, process.env.JWT_SECRET);
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findById(decoded.id).select('-password'));

        case 6:
          req.user = _context.sent;
          next();
          _context.next = 15;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          res.status(401);
          throw new Error('Not authorized, token failed');

        case 15:
          if (token) {
            _context.next = 18;
            break;
          }

          res.status(401);
          throw new Error('Not authorized, no token');

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

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

exports.isInstructor = function _callee2(req, res, next, id) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findById(id).exec());

        case 3:
          user = _context2.sent;

          if (user.role.includes('Instructor')) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.sendStatus(403));

        case 8:
          next();

        case 9:
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.isEnrolled = function _callee3(req, res, next) {
  var user, course, ids, i;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user._id).exec());

        case 3:
          user = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(Course.findOne({
            slug: req.params.slug
          }).exec());

        case 6:
          course = _context3.sent;
          ids = [];

          for (i = 0; i < user.courses.length; i++) {
            ids.push(user.courses[i].toString());
          }

          if (!ids.includes(course._id.toString())) {
            res.sendStatus(403);
          } else {
            next();
          }

          _context3.next = 15;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 12]]);
};
/*
app.get("/recommend", (req, res) => {
  let userId = req.query.userId
  if (Number(userId) > 53424 || Number(userId) < 0) {
    res.send("User Id cannot be greater than 53,424 or less than 0!")
  } else {
    recs = model.recommend(userId).then((recs) => { res.render("index", { recommendations: recs, forUser: true })})
  }
})
*/

/*
  exports.requireSignin = jwt({ secret: process.env.JWT_SECRET, userProperty: 'auth', algorithms: ['HS256']})

  exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    //if (!user) { return res.status(403).json({ error: 'Access denied'})}
    //if (err) { console.log(err)}
    next()
  }

  exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) { return res.status(403).json({ error: 'Admin resource! Access denied'})}
  next();
  };

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