"use strict";

var mongoose = require("mongoose");

var ObjectId = mongoose.Schema.ObjectId;
var categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
    unique: true
  },
  courses: [{
    type: ObjectId,
    ref: "Course"
  }]
}, {
  timestamps: true
});
module.exports = mongoose.model("Category", categorySchema);