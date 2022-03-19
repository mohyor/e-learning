const express = require('express')
const queryString = require('query-string')
const router = express.Router()

const User = require('../models/user')
const Course = require('../models/course')

const { isInstructor, isAuth, instructorById } = require('../middleware')

router.param('userId', instructorById)

router.get('/instructor/:userId',  isAuth, (req, res) => { res.json({ user: req.profile })})

router.get('/instructor-courses', isAuth, async (req, res) => {
 try { 
  const courses = await Course.find({ instructor: req.user._id })
   .sort({ createdAt: -1 })
   .exec()
  res.json(courses)      
 } catch (err) { console.log(err)} 
})

router.post('/instructor/student-count', isAuth, async (req, res) => {
 try {
  const users = await User.find({ courses: req.body.courseId })
   .select('_id')
   .exec()
  res.json(users)
 } catch (err) { console.log(err)} 
})

module.exports = router

