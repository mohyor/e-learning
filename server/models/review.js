const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const reviewSchema = new mongoose.Schema({
 comment: { type: String }, 
 rating: { type: Number,  required: true },
 course: { type: ObjectId, ref: "Course", /* required: true */ },
 user: { type: ObjectId, ref: "User", /* required: true, */ },
 }, { timestamps: true }
)

module.exports = mongoose.model("Review", reviewSchema)
