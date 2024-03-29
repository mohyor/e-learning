"use strict";

var Mongoose = require('mongoose');

var Schema = Mongoose.Schema; // Review Schema

var ReviewSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    "default": null
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    "default": null
  },
  title: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    "default": 0
  },
  review: {
    type: String,
    trim: true
  },
  //isRecommended: { type: Boolean, default: true },
  //status: { type: String, default: 'Waiting Approval', enum: ['Waiting Approval', 'Rejected', 'Approved'] },
  updated: Date,
  created: {
    type: Date,
    "default": Date.now
  }
});
module.exports = Mongoose.model('Review', ReviewSchema);