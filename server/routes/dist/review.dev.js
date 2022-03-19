"use strict";

var express = require('express');

var router = express.Router(); // Bring in Models & Helpers

var Review = require('../models/review');

var Course = require('../models/course');

var _require = require('../middleware'),
    isAuth = _require.isAuth,
    userById = _require.userById,
    reviewById = _require.reviewById;

router.post('/review/add', isAuth, function (req, res) {
  var user = req.user;
  var review = new Review(Object.assign(req.body, {
    user: user._id
  }));
  review.save(function (err, data) {
    if (err) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }

    res.status(200).json({
      success: true,
      message: "Your review has been added successfully and will appear when approved!",
      review: data
    });
  });
});
module.exports = router;