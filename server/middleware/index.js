//const jwt = require('express-jwt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Course = require('../models/course')
const Category = require('../models/category')

/*
  exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) { return res.status(403).json({ error: 'Admin resource! Access denied'})}
  next();
  };
*/

exports.isAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]
  
  if(token == null) return res.sendStatus(401)
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}



//exports.requireSignin = jwt({ secret: process.env.JWT_SECRET, userProperty: 'auth', algorithms: ['HS256']})

/*
exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id
  //if (!user) { return res.status(403).json({ error: 'Access denied'})}
  //if (err) { console.log(err)}
  next()
}
*/

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) { return res.status(400).json({ error: 'User not found'})}
    req.profile = user; next()
  })
}

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
   if (err || !category) { return res.status(400).json({ error: 'Category does not exist' })}
   req.category = category; next()
  })
}

exports.reviewById = (req, res, next, id) => {
  Review.findById(id).exec((err, review) => {
   if (err || !review) { return res.status(400).json({ error: 'Review does not exist' })}
   req.review = review; next()
  })
}

exports.courseById = (req, res, next, id) => {
  Course.findById(id)
    .populate('category')
    .exec((err, course) => {
  if (err || !course) { return res.status(400).json({ error: "Course doesn't exist" })}
   req.course = course; next();
  })
 }

exports.instructorById = (req, res, next, id) => {
 User.findById(id).exec((err, user) => {
  if(!user.role.includes('Instructor')) { 
    console.log("Instructor: ", user)
    return res.sendStatus(403)} 
  else { res.json({ ok: true })}
  req.profile = user; next()
})
}

exports.isInstructor = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).exec()
    if(!user.role.includes('Instructor')) { return res.sendStatus(403)
    } else { next()}
  } catch(err) { console.log(err)}
}

exports.isEnrolled = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).exec()
    const course = await Course.findOne({ slug: req.params.slug }).exec()
    
    let ids = []
    for(let i = 0; i< user.courses.length; i++) { ids.push(user.courses[i].toString())}
    
    if(!ids.includes(course._id.toString())) { res.sendStatus(403)} else {next()} 
  } catch (err) { console.log(err) }
}

/*
export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check current user
export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
}
*/
