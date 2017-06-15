const mongoose = require('mongoose')
const Schema = mongoose.Schema
const sendSMS = require('../core/smsClient')

const userSchema = new Schema({
  phone: { type: Number, required: true, unique: true },
  maxPushups: { type: Number, required: true },
  totalPushups: { type: Number },
  totalWorkouts: { type: Number },
  created_at: Date,
  updated_at: Date
})

userSchema.statics.completeWorkout = function (userId) {
  this.where('id', userId).exec()
  .then((user) => {
    // updates the user statics, increments their maxPushups
    user.maxPushups += 1
    user.totalWorkouts += 1
    return user.save()
  })
  .then((user) => {
    let msg = "Way to crush the gnar. We'll have something more for you tomorrow. Stay strong."
    sendSMS(msg, user.phone)
  })
  .catch((err) => {
    console.log('error ===========>', err)
  })
}
// function getRandomPonyFooArticle () {
//   return new Promise((resolve, reject) => {
//     request('https://ponyfoo.com/articles/random', (err, res, body) => {
//       if (err) {
//         reject(err); return;
//       }
//       resolve(body);
//     });
//   });
// }

const User = mongoose.model('User', userSchema)

module.exports = User
