"use strict";

var express = require('express');

var router = express.Router();

var Review = require('../models/review');

var Course = require('../models/course');

var _require = require('../middleware'),
    isAuth = _require.isAuth,
    userById = _require.userById,
    reviewById = _require.reviewById;

router.param('reviewId', reviewById);
router.param('userId', userById);
router.post('/review/create', isAuth, function (req, res) {
  var user = req.user;
  var review = new Review(Object.assign(req.body, {
    user: user._id
  }));
  review.save(function (err, data) {
    if (err) {
      return res.status(400).json({
        error: 'Review failed to be saved.'
      });
    }

    res.status(200).json({
      success: true,
      review: data
    });
  });
});
router.get('/reviews', function _callee(req, res) {
  var reviews;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Review.find({}).populate('user', 'name').populate('course', 'name').sort('-createdAt'));

        case 3:
          reviews = _context.sent;
          res.status(200).json({
            reviews: reviews
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            error: 'Failed to get reviews.'
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
/*
router.get('/:slug', async (req, res) => {
  try {
    const CourseDoc = await Course.findOne({ slug: req.params.slug });

    if (!CourseDoc || (CourseDoc && CourseDoc?.brand?.isActive === false)) {
      return res.status(404).json({
        message: 'No reviews for this Course.'
      });
    }

    const reviews = await Review.find({
      Course: CourseDoc._id,
      status: 'Approved'
    })
      .populate({
        path: 'user',
        select: 'firstName'
      })
      .sort('-created');

    res.status(200).json({
      reviews
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const update = req.body;
    const query = { _id: reviewId };

    await Review.findOneAndUpdate(query, update, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: 'review has been updated successfully!'
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// approve review
router.put('/approve/:reviewId', auth, async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    const query = { _id: reviewId };
    const update = {
      status: 'Approved',
      isActive: true
    };

    await Review.findOneAndUpdate(query, update, {
      new: true
    });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// reject review
router.put('/reject/:reviewId', auth, async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    const query = { _id: reviewId };
    const update = {
      status: 'Rejected'
    };

    await Review.findOneAndUpdate(query, update, {
      new: true
    });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const review = await Review.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: `review has been deleted successfully!`,
      review
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});
*/

module.exports = router;