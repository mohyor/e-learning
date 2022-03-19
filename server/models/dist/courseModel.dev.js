"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ObjectId = _mongoose["default"].Schema.ObjectId;
/*
const lessonSchema = new mongoose.Schema({
 title: { type: String, trim: true, minlength: 3, maxlength: 320, required: true, },
 slug: { type: String, lowercase: true, }, content: { type: {}, minlength: 200, },
 video: {}, free_preview: { type: Boolean, default: false, },
}, { timestamps: true })

const courseSchema = new mongoose.Schema({
 name: { type: String, trim: true, minlength: 3, maxlength: 320, required: true, },
 slug: { type: String, lowercase: true, },
 description: { type: {}, minlength: 200, required: true, }, 
 price: { type: Number, default: 9.99, },
 image: {}, category: String, published: { type: Boolean, default: false },
 paid: { type: Boolean, default: true, }, 
 instructor: { type: ObjectId, ref: 'User', required: true, },
 lessons: [lessonSchema],
}, { timestamps: true})
*/

var courseSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 320,
    required: true
  },
  slug: {
    type: String,
    lowercase: true
  },
  embedId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: ObjectId,
    ref: "Category",
    required: true
  },
  instructor: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  student: [{
    type: ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

var _default = _mongoose["default"].model('Course', courseSchema);

exports["default"] = _default;