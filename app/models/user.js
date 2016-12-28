const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  phone: { type: Number, required: true, unique: true },
  maxPushups: { type: Number, required: true },
  timeOfWorkout: { type: String, required: true },
  created_at: Date,
  updated_at: Date
})

const User = mongoose.model('User', userSchema)

module.exports = User
