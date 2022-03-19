"use strict";

var _express = _interopRequireDefault(require("express"));

var _instructorController = require("../controllers/instructorController");

var _indexMiddleware = require("../middleware/indexMiddleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.put('/make-instructor', _indexMiddleware.requireSignin, _instructorController.makeInstructor);
router.post('/instructor/student-count', _indexMiddleware.requireSignin, _instructorController.studentCount);
router.get('/current-instructor', _indexMiddleware.requireSignin, _instructorController.currentInstructor);
router.get('/instructor-courses', _indexMiddleware.requireSignin, _instructorController.instructorCourses); //router.post('/make-instructor', requireSignin, makeInstructor)
//router.post('/get-account-status', requireSignin, getAccountStatus)
//router.get('/instructor/balance', requireSignin, instructorBalance)
//router.get('/instructor/payout-settings', requireSignin, instructorPayoutSettings)

module.exports = router;