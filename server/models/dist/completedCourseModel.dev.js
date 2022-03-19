"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ObjectId = _mongoose["default"].Schema.ObjectId;
var completedCourseSchema = new _mongoose["default"].Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  course: {
    type: ObjectId,
    ref: 'Course'
  },
  lessons: []
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('CompletedCourse', completedCourseSchema);

exports["default"] = _default;