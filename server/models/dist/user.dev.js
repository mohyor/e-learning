"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
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
}, {
  timestamps: true
});
module.exports = mongoose.model('User', userSchema);