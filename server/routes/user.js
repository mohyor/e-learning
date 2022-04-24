const express = require('express')
const router = express.Router()

const { isAuth, checkAuth, userById } = require('../middleware')
const User = require('../models/user')
const { hashPassword, comparePassword } = require('../utils')
const jwt = require('jsonwebtoken')
const { nanoid } = require('nanoid')

router.param('userId', userById)

// Register
router.post('/register', async (req, res) => {
 try { 
  const { name, email, password } = req.body
  if (!name) return res.status(400).send("Name is required")
  if (!password || password.length < 6) {
    return res
      .status(400)
      .send('Password is required and should be min 6 characters long')
  }
  let userExist = await User.findOne({ email }).exec()
  if (userExist) return res.status(400).send("Email is taken")
  
  const hashedPassword = await hashPassword(password)
  const user = new User({ name, email, password: hashedPassword, })
  await user.save()
  return res.json(user)
 } catch (err) { console.log(err)
   return res.status(400).send("Error. Try again")
 } 
})

// Login
router.post('/login', (req, res) => {
 try {
  const { email, password } = req.body 
  User.findOne({ email }, (err, user) => {
    if (err || !user) return res.status(400).send("No user found")
    
    const match = comparePassword(password, user.password)
    if (!match) return res.status(400).send('Wrong password')
    
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "9999d" }) //res.cookie('token', token, { expire: new Date() + 9999 })
    
    const { _id, name, email, role } = user
    return res.json({ token, user: { _id, email, name, role }})
  })
 } catch (err) { console.log(err) 
  return res.status(400).send("Error. Try again.")
 }
})

// Logout
router.get('/logout', async (req, res) => {
 try { 
   res.clearCookie('token')
   return res.json({ message: 'Signout success' })
   res.redirect('/')
 } catch (err) { console.log(err) }
})

// Read all users
router.get('/users', isAuth, async (req, res) => {
  const users = await User.find({}).populate('courses', 'name');
  res.send(users);
})

/* Read
 router.get('/user/:userId', isAuth, (req, res) => { res.json({ user: req.user._id })})
 router.get('/user/:userId', isAuth, (req, res) => { res.json({ user: req.user })})
 router.get('/user/:userId', isAuth, (req, res) => { res.json({ user: req.profile._id })})
 router.get('/user/:userId', isAuth, (req, res) => { res.json({ user: req.profile.id })})
 router.get('/user/:userId', isAuth, (req, res) => { res.json({ user: req.profile })})
*/
router.get('/user/:userId', isAuth, async (req, res) => { 
  try {
    const user = await User.findById(req.params.userId).populate('courses', 'name')
    res.status(200).json(user)
   } catch (err) { res.status(500).json(err)} 
})

// Update
router.put('/user/:userId', isAuth, (req, res) => {
 const { name, password } = req.body

 User.findOne({ _id: req.profile._id }, (err, user) => {
   if (err || !user) { return res.status(400).json({ error: 'User not found' })}
   if (!name) { return res.status(400).json({ error: 'Name is required' })} else { user.name = name }
   if (password) { 
     if (password.length < 6) { return res.status(400).json({ error: 'Password should be min 6 characters long' })
     } else { user.password = password }}

   user.save((err, updatedUser) => {
     if (err) { return res.status(400).json({ error: 'User update failed' })}
     updatedUser.password = undefined; res.json(updatedUser)
   })
 })
})

// Delete User
router.delete('/user/:userId', isAuth, async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else { res.status(404); throw new Error('User not found')}
})

router.post('/forgot-password', async(req, res) => {
 try {
   const { email } = req.body
   const shortCode = nanoid(6).toUpperCase()
   const user = await User.findOneAndUpdate( { email }, { passwordResetCode: shortCode })
   if(!user) return res.status(400).send('User not found')

   // prepare for email
   const params = { 
     Source: process.env.EMAIL_FROM, Destination: { ToAddresses: [email]}, Message: { 
      Body: { Html: { 
       Charset: 'UTF-8', 
       Data: `<html><h1>Reset password</h1><p>Use this code to reset your password</p><h2 style="color:red;">${shortCode}</h2><i>elearn.com</i></html>`}}},
       Subject: { Charset: 'UTF-8', Data: 'Reset Password'}
   }
 } catch(err) { console.log(err)}
})

router.post('/reset-password', async (req, res) => {
  try { const { email, code, newPassword } = req.body
  const hashedPassword = await hashedPassword(newPassword)
  const user = User.findOneAndUpdate({ email, passwordResetCode: code, }, { password: hashedPassword, passwordResetCode: '', }).exec()
  res.json({ ok: true })
  } catch (err) { console.log(err)
    return res.status(400).send('Error! Try again.')
  }
})

module.exports = router

/*
  Get Profile
  router.get('/user/profile', checkAuth, async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) { res.json({ _id: user._id, name: user.name, email: user.email, })} 
    else { res.status(404); throw new Error('User not found')}
  })

  Update Profile
  router.put('/user/profile', checkAuth, async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) { user.password = req.body.password }

      const updatedUser = await user.save()
      res.json({ updatedUser }) //res.json({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, token: generateToken(updatedUser._id),})
    } else { res.status(404); throw new Error('User not found')}
  })
*/