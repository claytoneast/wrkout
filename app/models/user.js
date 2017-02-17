const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  phone: { type: Number, required: true, unique: true },
  maxPushups: { type: Number, required: true },
  confirmationCode: { type: Number, required: true },
  activeUser: { type: Boolean },
  totalPushups: { type: Number },
  totalWorkouts: { type: Number },
  invitorId: { type: String },
  inviteeId: { type: String },
  inviteCode: { type: String },
  created_at: Date,
  updated_at: Date
})

const User = mongoose.model('User', userSchema)

module.exports = User
