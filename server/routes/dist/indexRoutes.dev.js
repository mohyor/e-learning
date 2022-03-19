"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

var _indexMiddleware = require("../middleware/indexMiddleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/register', _userController.register);
router.post('/login', _userController.login);
router.get('/logout', _userController.logout);
router.get('/current-user', _indexMiddleware.requireSignin, _userController.currentUser);
router.post('/forgot-password', _userController.forgotPassword);
router.post('/reset-password', _userController.resetPassword);
var _default = router;
exports["default"] = _default;