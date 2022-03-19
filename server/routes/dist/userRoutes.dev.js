"use strict";

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

var _indexMiddleware = require("../middleware/indexMiddleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.param('userId', _indexMiddleware.userById);
router.get('/user/:userId', _indexMiddleware.requireSignin, _indexMiddleware.isAuth, _userController.read);
router.put('/user/:userId', _indexMiddleware.requireSignin, _indexMiddleware.isAuth, _userController.update);
router.post('/register', _userController.register);
router.post('/login', _userController.login);
router.get('/logout', _userController.logout); //router.get('/current-user', requireSignin, currentUser)

router.post('/forgot-password', _userController.forgotPassword);
router.post('/reset-password', _userController.resetPassword);
module.exports = router;