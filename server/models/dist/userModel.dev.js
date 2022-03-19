"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var ObjectId = Schema.ObjectId;
var userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 64
  },
  picture: {
    type: String,
    "default": '/avatar.png'
  },
  role: {
    type: [String],
    "default": ['Subscriber'],
    "enum": ['Subscriber', 'Instructor', 'Admin']
  },
  passwordResetCode: {
    data: String,
    "default": ''
  },
  courses: [{
    type: ObjectId,
    ref: 'Course'
  }]
  /*stripe_account_id: "",
  stripe_seller: {},
  stripeSession: {},*/

}, {
  timestamps: true
});

var _default = _mongoose["default"].model('User', userSchema);

exports["default"] = _default;