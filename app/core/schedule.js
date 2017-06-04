const User = require('../models/user')
const schedule = require('node-schedule')
const sms = require('./smsClient')
let cronTimestampsForWorkouts = ['0 21 * * *', '2 21 * * *', '4 21 * * *', '6 21 * * *', '8 21 * * *', '10 21 * * *']
let percentagesOfMax = [0.4, 0.5, 0.5, 0.5, 0.5, 0.33]

module.exports = {
  scheduleEvents: function () {
    for (let i = 0; i < 6; i++) {
      schedule.scheduleJob(cronTimestampsForWorkouts[i], function () { // set/send workouts
        User.find({}, function (err, users) {
          if (err) return console.log(err)
          for (let user of users) {
            let max = user.maxPushups
            let reps = Math.floor(percentagesOfMax[i] * max)
            sms.sendSMS(`Bust out ${reps} pushups.`)
          }
        })
      })
    }
    schedule.scheduleJob('17 21 * * *', function () { // send text to get confirmation
      User.find({}, function (err, users) {
        if (err) return console.log(err)
        for (let user of users) {
          let message = 'Were you able to complete all of the sets? Respond "Yes" or "No".'
          let number = user.phone
          sms.sendSMS(message, number)
        }
      })
    })
  }
}

// CRON FORMAT
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    |
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (OPTIONAL)
