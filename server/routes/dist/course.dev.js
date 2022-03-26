"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var slugify = require('slugify');

var router = express.Router();

var _require = require('../middleware'),
    isInstructor = _require.isInstructor,
    isEnrolled = _require.isEnrolled,
    isAuth = _require.isAuth,
    userById = _require.userById,
    courseById = _require.courseById;

var Course = require('../models/course');

var User = require('../models/user');

router.param('userId', userById);
router.param("courseId", courseById); // Create Course

router.post('/course/:userId', isAuth, isInstructor, function _callee(req, res) {
  var alreadyExist, course;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Course.findOne({
            slug: slugify(req.body.name.toLowerCase())
          }));

        case 3:
          alreadyExist = _context.sent;

          if (!alreadyExist) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).send('Title is taken'));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(new Course(_objectSpread({
            slug: slugify(req.body.name),
            instructor: req.profile.id
          }, req.body)).save());

        case 8:
          course = _context.sent;
          res.json(course);
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(400).send('Course create failed. Try again'));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}); // Update Course

router.put('/course/:slug', isAuth, function _callee2(req, res) {
  var slug, course, updated;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          slug = req.params.slug;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Course.findOne({
            slug: slug
          }).exec());

        case 4:
          course = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(Course.findOneAndUpdate({
            slug: slug
          }, req.body, {
            "new": true
          }).exec());

        case 7:
          updated = _context2.sent;
          res.json(updated);
          _context2.next = 15;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.log("Course Update Failed", _context2.t0);
          return _context2.abrupt("return", res.status(400).send(_context2.t0.message));

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // Read Course

router.get('/course/:slug', function _callee3(req, res) {
  var course;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Course.findOne({
            slug: req.params.slug
          }).populate('instructor', '_id name').exec());

        case 3:
          course = _context3.sent;
          res.json(course);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Course Enrollment

router.put('/free-enrollment/:userId', isAuth, function _callee4(req, res) {
  var course, studentCourse;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Course.findOne({
            slug: req.params.slug
          }));

        case 3:
          course = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.params.userId, {
            $addToSet: {
              courses: req.body.courseId
            }
          }, {
            "new": true
          }).exec());

        case 6:
          studentCourse = _context4.sent;
          res.json({
            message: 'Congratulations! You have successfully enrolled',
            studentCourse: studentCourse
            /*enrolledStudents*/

          });
          _context4.next = 14;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.log('free enrollment err', _context4.t0);
          return _context4.abrupt("return", res.status(400).send('Enrollment create failed'));

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); //router.get('/user/course/:slug', requireSignin, isEnrolled, read)
// User Courses

router.get('/user-courses/:userId', isAuth, function _callee5(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.userId).populate('courses'));

        case 3:
          user = _context5.sent;
          res.status(200).json(user.courses);
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Courses List

router.get('/courses', function _callee6(req, res) {
  var all;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Course.find({
            published: true
          }).populate('instructor', '_id name').exec());

        case 2:
          all = _context6.sent;
          res.json(all);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
}); // Add a student to the Course Document. - Not Working

router.put('/enrolling/:courseId', isAuth, function _callee7(req, res) {
  var enrollingStudent;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Course.findOneAndUpdate({
            slug: req.params.slug
          }, {
            $addToSet: {
              students: req.body.userId
            }
          }, {
            "new": true
          }).exec);

        case 2:
          enrollingStudent = _context7.sent;
          res.json({
            message: 'The student has been enrolled.',
            enrollingStudent: enrollingStudent
          });

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
}); // Check Course Enrollment Status - Not Working

router.get('/enrolled-students/:courseId', isAuth, function _callee8(req, res) {
  var courseId, user, ids, length, i;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          courseId = req.params.courseId;
          _context8.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.userId).exec());

        case 3:
          user = _context8.sent;
          ids = [], length = user.courses && user.courses.length;

          for (i = 0; i < length; i++) {
            ids.push(user.courses[i].toString());
          }

          _context8.t0 = res;
          _context8.t1 = ids.includes(courseId);
          _context8.next = 10;
          return regeneratorRuntime.awrap(Course.findById(courseId).exec());

        case 10:
          _context8.t2 = _context8.sent;
          _context8.t3 = {
            status: _context8.t1,
            course: _context8.t2
          };

          _context8.t0.json.call(_context8.t0, _context8.t3);

        case 13:
        case "end":
          return _context8.stop();
      }
    }
  });
}); // Read Number of Users Enrolled in a Course.

router.get('/enrolled-students/:courseId', isAuth, function _callee9(req, res) {
  var course, user, enrolledUsers;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(Course.findById(req.params.id));

        case 2:
          course = _context9.sent;
          _context9.next = 5;
          return regeneratorRuntime.awrap(User.findById(req.params.userId));

        case 5:
          user = _context9.sent;
          enrolledUsers = user.aggregate([{
            $match: {
              courses: course
            }
          }, {
            $count: ''
          }]);
          res.status(200).json(enrolledUsers);

        case 8:
        case "end":
          return _context9.stop();
      }
    }
  });
}); // Create New Review 

router.put('/course/:courseId/review', isAuth, function _callee10(req, res, next) {
  var _req$body, rating, comment, courseId, review, course, isReviewed, avg;

  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _req$body = req.body, rating = _req$body.rating, comment = _req$body.comment, courseId = _req$body.courseId;
          review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment: comment
          };
          _context10.next = 4;
          return regeneratorRuntime.awrap(Course.findById(courseId));

        case 4:
          course = _context10.sent;
          isReviewed = course.reviews.find(function (rev) {
            return rev.user.toString() === req.user._id.toString();
          });

          if (isReviewed) {
            course.reviews.forEach(function (rev) {
              if (rev.user.toString() === req.user._id.toString()) rev.rating = rating, rev.comment = comment;
            });
          } else {
            course.reviews.push(review);
            course.numOfReviews = course.reviews.length;
          }

          avg = 0;
          course.reviews.forEach(function (rev) {
            avg += rev.rating;
          });
          course.ratings = avg / course.reviews.length;
          _context10.next = 12;
          return regeneratorRuntime.awrap(course.save({
            validateBeforeSave: false
          }));

        case 12:
          res.status(200).json(course);

        case 13:
        case "end":
          return _context10.stop();
      }
    }
  });
}); // Get All Reviews of a Course 

router.get('/course/:slug/reviews', isAuth, function _callee11(req, res, next) {
  var course;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(Course.findOne({
            slug: req.params.slug
          }));

        case 3:
          course = _context11.sent;

          if (course) {
            _context11.next = 6;
            break;
          }

          return _context11.abrupt("return", res.json({
            message: "Course not found"
          }));

        case 6:
          res.status(200).json({
            success: true,
            reviews: course.reviews
          });
          _context11.next = 12;
          break;

        case 9:
          _context11.prev = 9;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);

        case 12:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Delete Review

router["delete"]('/course/:courseId/review', isAuth, function _callee12(req, res, next) {
  var course, reviews, avg, ratings, numOfReviews;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(Course.findById(req.query.courseId));

        case 2:
          course = _context12.sent;

          if (course) {
            _context12.next = 5;
            break;
          }

          return _context12.abrupt("return", res.json({
            message: "Course not found"
          }));

        case 5:
          reviews = course.reviews.filter(function (rev) {
            return rev._id.toString() !== req.query.id.toString();
          });
          avg = 0;
          reviews.forEach(function (rev) {
            avg += rev.rating;
          });
          ratings = 0;

          if (reviews.length === 0) {
            ratings = 0;
          } else {
            ratings = avg / reviews.length;
          }

          numOfReviews = reviews.length;
          _context12.next = 13;
          return regeneratorRuntime.awrap(Course.findByIdAndUpdate(req.query.courseId, {
            reviews: reviews,
            ratings: ratings,
            numOfReviews: numOfReviews
          }, {
            "new": true,
            runValidators: true,
            useFindAndModify: false
          }));

        case 13:
          res.status(200).json({
            success: true,
            message: "Course successfully deleted."
          });

        case 14:
        case "end":
          return _context12.stop();
      }
    }
  });
});
module.exports = router; ///////////

/*
  
router.put('/course/publish/:courseId', requireSignin, async (req, res) => {
 try {
  const { courseId } = req.params
  const course = await Course.findById(courseId).select('instructor').exec()

  if(course.instructor._id != req.user._id) { return res.status(400).send('Unauthorized')}

  const updated = await Course.findByIdAndUpdate(courseId, { published: true }, { new: true }).exec(); res.json(updated)
 } catch(err) { console.log(err); return res.status(400).send('Publish course failed')}
})

router.put('/course/unpublish/:courseId', requireSignin, async (req, res) => {
 try {
  const { courseId } = req.params 
  const course = await Course.findById(courseId).select('instructor').exec()

  if(course.instructor._id != req.user._id) { return res.status(400).send('Unauthorized')}

  const updated = await Course.findByIdAndUpdate(courseId, { published: true }, { new: true }).exec(); res.json(updated)
 } catch(err) { console.log(err);  return res.status(400).send('Unpublish course failed')}
})
*/