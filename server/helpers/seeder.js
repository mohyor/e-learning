const mongoose = require('mongoose')
require("dotenv").config()
const users = require('./users.js')
const reviews = require('./reviews.js')
const User = require('../models/user.js')
const Review = require('../models/review.js')

mongoose.connect("mongodb://localhost:27017/finalyrproj", { useNewUrlParser: true, useUnifiedTopology: true, })
 .then(() => console.log('DB CONNECTED'))
 .catch((err) => console.log("DB CONNECTION ERR =>", err))

const importData = async () => {
 try {
  await User.insertMany(users)
  //await Review.insertMany(reviews)
  console.log('Data Imported!')
  process.exit()
 } catch (error) {
  console.error(`${error}`)
  process.exit(1)
 }
}

importData()
