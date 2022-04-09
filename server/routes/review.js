const express = require('express');
const router = express.Router();

const Review = require('../models/review');
const Course = require('../models/course');

const { isAuth, userById, reviewById } = require('../middleware')

router.param('reviewId', reviewById)
router.param('userId', userById)

router.post('/review/create', isAuth, (req, res) => {
 const user = req.user;
 const review = new Review(Object.assign(req.body, { user: user._id }));

 review.save((err, data) => {
  if (err) { return res.status(400).json({ error: 'Review failed to be saved.'})}
  res.status(200).json({ success: true, review: data });
 })
})

router.get('/reviews', async (req, res) => {
 try {
  const reviews = await Review.find({})
   .populate('user').populate('course').sort('-createdAt')
   
  res.status(200).json({ reviews })
} catch (error) { res.status(400).json({ error: 'Failed to get reviews.' })}
})

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

module.exports = router
