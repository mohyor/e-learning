const express = require('express')
const router = express.Router()

const { isAuth, userById } = require('../middleware')
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
  return res.json({ message: "Successfully Registered." })
 } catch (err) { console.log(err)
   return res.status(400).send("Error. Try again")
 } 
})

// Read
//router.get('/user/:userId', isAuth, (req, res) => { res.json({ user: req.user._id })})
//router.get('/user/:userId', isAuth, (req, res) => { res.json({ user: req.user })})
//router.get('/user/:userId', isAuth, (req, res) => { res.json({ user: req.profile._id })})
//router.get('/user/:userId', isAuth, (req, res) => { res.json({ user: req.profile.id })})
router.get('/user/:userId', isAuth, (req, res) => { res.json({ user: req.profile })})

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
}
)

// Login
router.post('/login', (req, res) => {
 try {
   const { email, password } = req.body 
   User.findOne({ email }, (err, user) => {
     if (err || !user) return res.status(400).send("No user found")
     
     const match = comparePassword(password, user.password)
     if (!match) return res.status(400).send('Wrong password')
     
     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "9999d" })
     //res.cookie('token', token, { expire: new Date() + 9999 })
     
     const { _id, name, email, role } = user
     return res.json({ token, user: { _id, email, name, role }})
   })
 } catch (err) { 
   console.log(err) 
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

/*
router.get('/current-user', requireSignin, async (req, res) => {
 try {
   const user = await User.findById(req.user._id).select('-password').exec()
   console.log('CURRENT USER', user)
   return res.json({ ok: true })
 } catch (err) { console.log(err)}
})
*/

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