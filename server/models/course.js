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
 //reviews: [reviewSchema], 
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

/**
 * const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);


const reviewSchema = mongoose.Schema({
 name: { type: String, required: true },
 rating: { type: Number, required: true },
 comment: { type: String, required: true },
 user: { type: ObjectId, ref: 'User' },
}, { timestamps: true,})

 */

