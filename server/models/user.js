const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema

const userSchema = new Schema({
 name: { type: String, trim: true, required: true, },
 userNo: { type: String, required: true },
 email: { type: String, trim: true, required: true, unique: true },
 password: { type: String, required: true, min: 6, max: 64, },
 //picture: { type: String, default: '/avatar.png', },
 role: { type: [String], default: ['Subscriber'], enum: ['Subscriber', 'Instructor', 'Admin']},
 passwordResetCode: { data: String, default: '' },
 //courses: [{ type: ObjectId, ref: 'Course' },],
 courses: [{
  title: { type: ObjectId, ref: 'Course', required: true },
  //learned: { type: Boolean, default: false },
 }],
  /*
  social: [{ 
   title: { type: ObjectId, ref: 'Social', required: true },
   link: { type: String, default: false },
  }],
 */
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)

/*
 const counterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
 });

 module.exports = mongoose.model('Counter', counterSchema);

 userSchema.pre('save', function(next) {
  var doc = this;
  Counter.findByIdAndUpdate({ _id: 'userNo' }, { $inc: { seq: 1 }}, {new: true, upsert: true}, function(error, counter) {
   if(error) return next(error);
   doc.userNo = counter.seq.toString(); //doc.sort = count.seq;
   next()
  })
 })
*/