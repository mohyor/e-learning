const express = require('express')
const slugify = require('slugify')
const router = express.Router()

const { isInstructor, isEnrolled, isAuth, userById, courseById } = require('../middleware')

const Course = require('../models/course')
const User = require('../models/user')

router.param('userId', userById)
router.param("courseId", courseById)

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
 const all = await Course.find({ published: true }).exec()
 res.json(all)
}) 

// Course Enrollment
router.put('/free-enrollment/:userId', isAuth, async (req, res) => {
  try {
   const studentCourse = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { courses: req.body.courseId }, }, { new: true }).exec()
   //const studentCourse = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { 'courses.$.title': req.body.courseId }, }, { new: true }).exec()
 
   res.json({ message: 'Congratulations! You have successfully enrolled', studentCourse })
  } catch(err) { console.log('free enrollment err', err); return res.status(400).send('Enrollment create failed')}
})

// Finished Learning
router.put('/learned/:courseId', isAuth, async (req, res) => {
  try {
    const learned = await User.updateOne({ _id: req.params.id }, [{ "$set": { 'courses.$.learned': true }}])
    res.json({ message: "Finished learning the course.", learned })
  } catch(err) { console.log(err)}
})

//router.get('/user/course/:slug', requireSignin, isEnrolled, read)

// User Courses
router.get('/user-courses/:userId', isAuth, async (req, res) => {
  try {
   const user = await User.findById(req.params.userId).populate('courses')
   res.status(200).json(user.courses)
  } catch (err) { res.status(500).json(err)} 
})

// Add a student to the Course Document. - Not Working
router.put('/enrolling/:courseId', isAuth, async(req, res) => {
  const enrollingStudent = await Course.findOneAndUpdate({ slug: req.params.slug }, { $addToSet: { students: req.body.userId }, }, { new: true }).exec
  
  res.json({ message: 'The student has been enrolled.', enrollingStudent })
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

// Read Number of Users Enrolled in a Course.
router.get('/enrolled-students/:courseId', isAuth, async (req, res) => {
  const course = await Course.findById(req.params.id)
  const user = await User.findById(req.params.userId)
  const enrolledUsers = user.aggregate([
    { $match: { courses: course }},
    { $count: '' }
  ])
  res.status(200).json(enrolledUsers)
})

// Create New Review 
router.put('/course/:courseId/review', isAuth, async (req, res, next) => {
  const { rating, comment, courseId } = req.body;

  const review = { user: req.user._id, name: req.user.name, rating: Number(rating), comment, };
  const course = await Course.findById(courseId);

  const isReviewed = course.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

  if (isReviewed) {
    course.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    course.reviews.push(review);
    course.numOfReviews = course.reviews.length;
  }

  let avg = 0;
  course.reviews.forEach((rev) => { avg += rev.rating; });
  course.ratings = avg / course.reviews.length;

  await course.save({ validateBeforeSave: false });
  res.status(200).json(course);
});

// Get All Reviews of a Course 
router.get('/course/:slug/reviews', isAuth, async (req, res, next) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
    
    if (!course) { return res.json({ message: "Course not found" }); }
    res.status(200).json({ success: true, reviews: course.reviews, });
  } catch (err) { console.log(err)}  
});

// Delete Review
router.delete('/course/:courseId/review', isAuth, async (req, res, next) => {
  const course = await Course.findById(req.query.courseId);

  if (!course) { return res.json({ message: "Course not found" }); }
  const reviews = course.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => { avg += rev.rating; });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Course.findByIdAndUpdate(
    req.query.courseId,
    { reviews, ratings, numOfReviews, },
    { new: true, runValidators: true, useFindAndModify: false, }
  );

  res.status(200).json({ success: true, message: "Course successfully deleted." });
});

module.exports = router

///////////
/*
router.get("/recommend", recommend, (req, res) => {
  let userId = req.query.userId
  if (Number(userId) > 1000 || Number(userId) < 0) {
    res.send("User Id cannot be greater than 1000 or less than 0!")
  } else {
    recs = model.recommend(userId).then((recs) => { res.render("index", { recommendations: recs, forUser: true })})
  }
})  

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