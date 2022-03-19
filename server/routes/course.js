const express = require('express')
const slugify = require('slugify')
//import { readFileSync } from 'fs'
const router = express.Router()

const {  isInstructor, isEnrolled, isAuth, userById, courseById } = require('../middleware')

const Course = require('../models/course')
const User = require('../models/user')

router.param('userId', userById)
router.param("courseId", courseById)

// Routes concerned with the user model
// Create Course
router.post('/course/:userId', isAuth, isInstructor, async(req, res) => {
 try { 
  const alreadyExist = await Course.findOne({ slug: slugify(req.body.name.toLowerCase()),})
  if (alreadyExist) return res.status(400).send('Title is taken')
   
  const course = await new Course({ slug: slugify(req.body.name), instructor: req.profile.id, ...req.body, }).save()
  res.json(course)
 } catch(err) { console.log(err); return res.status(400).send('Course create failed. Try again')}
})

// Update Course
router.put('/course/:slug', isAuth, async (req, res) => {
 try {
  const { slug } = req.params
  const course = await Course.findOne({ slug }).exec()
  
  //if(req.profile.id != course.instructor) { return res.status(400).send('Unauthorized')}
  
  const updated = await Course.findOneAndUpdate({ slug }, req.body, { new: true,}).exec()
  res.json(updated)
 } catch(err) { console.log("Course Update Failed", err); return res.status(400).send(err.message)}
})

// Course Enrollment
router.put('/free-enrollment/:userId', isAuth, async (req, res) => {
  try {
   const course = await Course.findById(req.params.courseId).exec()
   const studentCourse = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { courses: req.body.courseId }, }, { new: true }).exec()
   //const enrolledStudents = await Course.findByIdAndUpdate(req.params.courseId, { $addToSet: { students: req.body.userId }, }, { new: true }).exec
 
   res.json({ message: 'Congratulations! You have successfully enrolled', studentCourse })
  } catch(err) { console.log('free enrollment err', err); return res.status(400).send('Enrollment create failed')}
})

//router.get('/user/course/:slug', requireSignin, isEnrolled, read)

// User Courses - I need to fix this code.
router.get('/user-courses/:userId', isAuth, async (req, res) => {
  try {
   const user = await User.findById(req.params.userId)
   const courses = await Course.find({ userId: { $in: user.courses }})
    .populate('instructor', '_id name')
    .exec()
   res.status(200).json(courses)
  } catch (err) { res.status(500).json(err)} 
 })

// Routes concerned with the course model.
// Read Course
router.get('/course/:slug', async(req, res) => {
 try {
  const course = await Course.findOne({ slug: req.params.slug })
   .populate('instructor', '_id name')
   .exec()
   res.json(course)
 } catch(err) { console.log(err)}
})

// Courses List
router.get('/courses', async (req, res) => {
 const all = await Course.find({ published: true })
  .populate('instructor', '_id name')
  .exec()
 res.json(all)
}) 

// Add a student to the Course Document.
router.put('/enrolling/:courseId', isAuth, async(req, res) => {
  const course = await Course.findById(req.params.courseId).exec()
})

// Check Course Enrollment Status - Not Working
router.get('/enrolled-students/:courseId', isAuth, async (req, res) => {
 const { courseId } = req.params 
 const user = await User.findById(req.params.userId).exec()
 
 let ids = [], length = user.courses && user.courses.length

 for(let i = 0; i < length; i++) { 
   ids.push(user.courses[i].toString())
 }
 res.json({ status: ids.includes(courseId), course: await Course.findById(courseId).exec(),})
})

// Not Working
router.put('/course/:courseId/review', isAuth, async (req, res) => {
 const { rating, comment } = req.body
 const course = await Course.findById(req.params.id)

 try {
  const review = { /*name: req.profile.name,*/ rating: Number(rating), comment, user: req.user._id, }
  course.reviews.push(review)
  course.numReviews = course.reviews.length
  //const enrolledStudents = await Course.findByIdAndUpdate(req.params.courseId, { $addToSet: { students: req.body.userId }, }, { new: true }).exec
  course.rating = course.reviews.reduce((acc, item) => item.rating + acc, 0) / course.reviews.length
  //course.reviews.push(review)
  await course.save()
  res.status(201).json({ message: 'Review added' })
 } catch (err) { console.log(err)} 
})

module.exports = router

///////////
/*
  const courseId = req.params.id;
  const course = await Course.findById(courseId);

  if (course) {
    if (course.reviews.find((x) => x.name === req.user.name)) {
      return res.status(400).send({ message: 'You already submitted a review' });
    }
    const review = { name: req.user.name, rating: Number(req.body.rating), comment: req.body.comment, };

    course.reviews.push(review);
    course.numReviews = course.reviews.length;
    course.rating = course.reviews.reduce((a, c) => c.rating + a, 0) / course.reviews.length;

    const updatedCourse = await course.save();
    res.status(201).send({ message: 'Review Created', review: updatedCourse.reviews[updatedCourse.reviews.length - 1], });
  }
  
router.put('/course/publish/:courseId', requireSignin, async (req, res) => {
 try {
  const { courseId } = req.params
  const course = await Course.findById(courseId).select('instructor').exec()

  if(course.instructor._id != req.user._id) { return res.status(400).send('Unauthorized')}

  const updated = await Course.findByIdAndUpdate(courseId, { published: true }, { new: true }).exec(); res.json(updated)
 } catch(err) { console.log(err); return res.status(400).send('Publish course failed')}
})

router.put('/course/unpublish/:courseId', requireSignin, async (req, res) => {
 try {
  const { courseId } = req.params 
  const course = await Course.findById(courseId).select('instructor').exec()

  if(course.instructor._id != req.user._id) { return res.status(400).send('Unauthorized')}

  const updated = await Course.findByIdAndUpdate(courseId, { published: true }, { new: true }).exec(); res.json(updated)
 } catch(err) { console.log(err);  return res.status(400).send('Unpublish course failed')}
})
*/