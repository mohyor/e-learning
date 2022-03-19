const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const reviewSchema = mongoose.Schema({
 //name: { type: String, /*required: true*/ },
 rating: { type: Number, /*required: true*/ },
 comment: { type: String, /*required: true*/ },
 user: { type: ObjectId, ref: 'User' },
}, { timestamps: true,})

const courseSchema = new mongoose.Schema({
 name: { type: String, trim: true, minlength: 3, maxlength: 320, required: true, },
 slug: { type: String, lowercase: true, },
 embedId: { type: String, required: true },
 description: { type: String, required: true },
 category: { type: ObjectId, ref: "Category", required: true },
 instructor: { type: ObjectId, ref: 'User', required: true, },
 students: [{ type: ObjectId, ref: 'User'}],
 reviews: [reviewSchema], 
 numReviews: { type: Number, required: true, default: 0}
}, { timestamps: true })

module.exports = mongoose.model('Course', courseSchema)

