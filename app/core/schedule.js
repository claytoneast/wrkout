const User = require('../models/user')
const schedule = require('node-schedule')
const sms = require('./smsClient')
let percentagesOfMax = [0.4, 0.5, 0.5, 0.5, 0.5, 0.33]

module.exports = {
  scheduleEvents: function () {
    let cronTimestampsForWorkouts = getCronTimestamps()
    cronTimestampsForWorkouts.forEach((item, index) => {
      schedule.scheduleJob(item, () => {
        User.find({})
            .then((users) => {
              for (let user of users) {
                let max = user.maxPushups
                let reps = Math.floor(percentagesOfMax[index] * max)
                sms.sendSMS(`Bust out ${reps} pushups.`, user.number)
              }
            })
            .catch((err) => {
              return console.log(err)
            })
      })
    })
    schedule.scheduleJob('17 21 * * *', () => {
      User.find({})
          .then((users) => {
            for (let user of users) {
              let message = 'Were you able to complete all of the sets? Respond "Yes" or "No".'
              let number = user.phone
              sms.sendSMS(message, number)
            }
          })
          .catch((err) => {
            return console.log(err)
          })
    })
  }
}

function getCronTimestamps () {
  let timestamps = []
  if (process.env.NODE_ENV === 'test') {
    let now = Date.now()
    let hour = now.getHours()
    let minute = now.getMinutes()
    for (let i = 0; i < 6; i++) {
      let nextMinute = minute + 2 * i
      if (nextMinute > 60) {
        nextMinute = nextMinute % 60
        hour += 1
      }
      timestamps.push(`${nextMinute} ${hour} * * *`)
    }
  } else {
    timestamps = ['0 21 * * *', '2 21 * * *', '4 21 * * *', '6 21 * * *', '8 21 * * *', '10 21 * * *']
  }
  return timestamps
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
