const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const courseSchema = new mongoose.Schema({
 name: { type: String, trim: true, minlength: 3, maxlength: 320, required: true, },
 slug: { type: String, lowercase: true, },
 embedId: { type: String, required: true },
 description: { type: String, required: true },
 category: { type: ObjectId, ref: "Category", required: true },
 instructor: { type: ObjectId, ref: 'User', required: true, },
 students: [{ type: ObjectId, ref: 'User'}],
 ratings: { type: Number, default: 0 },
 numOfReviews: { type: Number, required: true, default: 0},
 reviews: [{
  user: { type: ObjectId, ref: "User", required: true, },
  name: { type: String, required: true, },
  rating: { type: Number, required: true, },   
  comment: { type: String, required: true, },   
 },],
}, { timestamps: true })

module.exports = mongoose.model('Course', courseSchema)
