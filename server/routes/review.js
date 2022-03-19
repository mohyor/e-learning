const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Review = require('../models/review');
const Course = require('../models/course');

const { isAuth, userById, reviewById } = require('../middleware')

router.post('/review/add', isAuth, (req, res) => {
 const user = req.user;
 const review = new Review(Object.assign(req.body, { user: user._id }));

 review.save((err, data) => {
   if (err) {
     return res.status(400).json({
       error: 'Your request could not be processed. Please try again.'
     });
   }

   res.status(200).json({
     success: true,
     message: `Your review has been added successfully and will appear when approved!`,
     review: data
   });
 });
});

module.exports = router