const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    user.maxPushups += 2
    // update the user statics, increment their maxPushups
    return user.save()
  })
  .then((user) => {
    // send message to the user saying congratulations or wtv
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
