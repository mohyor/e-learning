"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../middleware'),
    isAuth = _require.isAuth,
    userById = _require.userById;

var User = require('../models/user');

var _require2 = require('../utils'),
    hashPassword = _require2.hashPassword,
    comparePassword = _require2.comparePassword;

var jwt = require('jsonwebtoken');

var _require3 = require('nanoid'),
    nanoid = _require3.nanoid;

router.param('userId', userById); // Register

router.post('/register', function _callee(req, res) {
  var _req$body, name, email, password, userExist, hashedPassword, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;

          if (name) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).send("Name is required"));

        case 4:
          if (!(!password || password.length < 6)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).send('Password is required and should be min 6 characters long'));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).exec());

        case 8:
          userExist = _context.sent;

          if (!userExist) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(400).send("Email is taken"));

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(hashPassword(password));

        case 13:
          hashedPassword = _context.sent;
          user = new User({
            name: name,
            email: email,
            password: hashedPassword
          });
          _context.next = 17;
          return regeneratorRuntime.awrap(user.save());

        case 17:
          return _context.abrupt("return", res.json({
            message: "Successfully Registered."
          }, user));

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).send("Error. Try again"));

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20]]);
}); // Read
//router.get('/user/:userId', isAuth, (req, res) => { res.json({ user: req.user._id })})
//router.get('/user/:userId', isAuth, (req, res) => { res.json({ user: req.user })})
//router.get('/user/:userId', isAuth, (req, res) => { res.json({ user: req.profile._id })})
//router.get('/user/:userId', isAuth, (req, res) => { res.json({ user: req.profile.id })})

router.get('/user/:userId', isAuth, function (req, res) {
  res.json({
    user: req.profile
  });
}); // Read all users

router.get('/users', isAuth, function _callee2(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.find({}));

        case 2:
          users = _context2.sent;
          res.send(users);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // Update

router.put('/user/:userId', isAuth, function (req, res) {
  var _req$body2 = req.body,
      name = _req$body2.name,
      password = _req$body2.password;
  User.findOne({
    _id: req.profile._id
  }, function (err, user) {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }

    if (!name) {
      return res.status(400).json({
        error: 'Name is required'
      });
    } else {
      user.name = name;
    }

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: 'Password should be min 6 characters long'
        });
      } else {
        user.password = password;
      }
    }

    user.save(function (err, updatedUser) {
      if (err) {
        return res.status(400).json({
          error: 'User update failed'
        });
      }

      updatedUser.password = undefined;
      res.json(updatedUser);
    });
  });
}); // Login

router.post('/login', function (req, res) {
  try {
    var _req$body3 = req.body,
        email = _req$body3.email,
        password = _req$body3.password;
    User.findOne({
      email: email
    }, function (err, user) {
      if (err || !user) return res.status(400).send("No user found");
      var match = comparePassword(password, user.password);
      if (!match) return res.status(400).send('Wrong password');
      var token = jwt.sign({
        _id: user._id
      }, process.env.JWT_SECRET, {
        expiresIn: "9999d"
      }); //res.cookie('token', token, { expire: new Date() + 9999 })

      var _id = user._id,
          name = user.name,
          email = user.email,
          role = user.role;
      return res.json({
        token: token,
        user: {
          _id: _id,
          email: email,
          name: name,
          role: role
        }
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
}); // Logout

router.get('/logout', function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          res.clearCookie('token');
          return _context3.abrupt("return", res.json({
            message: 'Signout success'
          }));

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
/*
router.get('/current-user', isAuth, async (req, res) => {
 try {
   const user = await User.findById(req.user._id).select('-password').exec()
   console.log('CURRENT USER', user)
   return res.json({ ok: true })
 } catch (err) { console.log(err)}
})
*/

router.post('/forgot-password', function _callee4(req, res) {
  var email, shortCode, user, params;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          email = req.body.email;
          shortCode = nanoid(6).toUpperCase();
          _context4.next = 5;
          return regeneratorRuntime.awrap(User.findOneAndUpdate({
            email: email
          }, {
            passwordResetCode: shortCode
          }));

        case 5:
          user = _context4.sent;

          if (user) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(400).send('User not found'));

        case 8:
          // prepare for email
          params = {
            Source: process.env.EMAIL_FROM,
            Destination: {
              ToAddresses: [email]
            },
            Message: {
              Body: {
                Html: {
                  Charset: 'UTF-8',
                  Data: "<html><h1>Reset password</h1><p>Use this code to reset your password</p><h2 style=\"color:red;\">".concat(shortCode, "</h2><i>elearn.com</i></html>")
                }
              }
            },
            Subject: {
              Charset: 'UTF-8',
              Data: 'Reset Password'
            }
          };
          _context4.next = 14;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
router.post('/reset-password', function _callee5(req, res) {
  var _req$body4, email, code, newPassword, hashedPassword, user;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body4 = req.body, email = _req$body4.email, code = _req$body4.code, newPassword = _req$body4.newPassword;
          _context5.next = 4;
          return regeneratorRuntime.awrap(hashedPassword(newPassword));

        case 4:
          hashedPassword = _context5.sent;
          user = User.findOneAndUpdate({
            email: email,
            passwordResetCode: code
          }, {
            password: hashedPassword,
            passwordResetCode: ''
          }).exec();
          res.json({
            ok: true
          });
          _context5.next = 13;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          return _context5.abrupt("return", res.status(400).send('Error! Try again.'));

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;