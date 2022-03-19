"use strict";

var _express = _interopRequireDefault(require("express"));

var _indexMiddleware = require("../middleware/indexMiddleware");

var _courseController = require("../controllers/courseController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.param('userId', _indexMiddleware.userById);
router.param("courseId", _courseController.courseById);
router.post('/course/:userId', _indexMiddleware.requireSignin, _indexMiddleware.isInstructor, _courseController.create);
router.get('/course/:slug', _courseController.read);
router.get('/courses', _courseController.courses);
router.put('/free-enrollment/:userId', _indexMiddleware.requireSignin, _courseController.freeEnrollment); // Not Working

router.put('/course/:courseId/:userId', _indexMiddleware.requireSignin, _indexMiddleware.isAuth, _courseController.update);
router.put('/course/publish/:courseId', _indexMiddleware.requireSignin, _courseController.publishCourse);
router.put('/course/unpublish/:courseId', _indexMiddleware.requireSignin, _courseController.unpublishCourse);
router.get('/check-enrollment/:userId', _indexMiddleware.requireSignin, _courseController.checkEnrollment);
router.get('/user-courses/:userId', _indexMiddleware.requireSignin, _courseController.userCourses);
router.get('/user/course/:slug', _indexMiddleware.requireSignin, _indexMiddleware.isEnrolled, _courseController.read);
/*
 router.put('/free-enrollment/:courseId', requireSignin, freeEnrollment)
 router.put('/course/:slug', requireSignin, update)
 router.post('/course/upload-image', uploadImage)
 router.post('/course/remove-image', removeImage)
 router.post('/mark-completed', requireSignin, markCompletedLessons)
 router.post('/list-completed', requireSignin, listCompletedLessons)
 router.post('/mark-incomplete', requireSignin, markUncompletedLessons)
 router.post('/course/lesson/:slug/:instructorId', requireSignin, addLesson)
 router.put('/course/lesson/:slug/:instructorId', requireSignin, updateLesson)
 router.put('/course/:slug/:lessonId', requireSignin, removeLesson)
 router.post('/course/video-upload/:instructorId', requireSignin, formidable(), uploadVideo)
 router.post('/course/video-remove/:instructorId', requireSignin, removeVideo)
 router.post('/paid-enrollment/:courseId', requireSignin, paidEnrollment)
 router.get('/stripe-success/:courseId', requireSignin, stripeSuccess)
*/

module.exports = router;