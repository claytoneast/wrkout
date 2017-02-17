const User = require('./app/models/user')
const schedule = require('node-schedule')
const sms = require('./twilio')
let cronTimestampsForWorkouts = ['0 21 * * *', '2 21 * * *', '4 21 * * *', '6 21 * * *', '8 21 * * *', '10 21 * * *']
let percentagesOfMax = [0.4, 0.5, 0.5, 0.5, 0.5, 0.33]

scheduleWorkouts()

let scheduleWorkouts = () => {
  console.log('launching the first ships captain')
  for (let i = 0; i < 6; i++) {
    console.log(`scheduling event ${i + 1} of 6`)
    schedule.scheduleJob(cronTimestampsForWorkouts[i], function () { // set/send workouts
      User.find({}, function (err, users) {
        if (err) return console.log(err)
        for (let user of users) {
          let max = user.maxPushups
          let reps = Math.floor(percentagesOfMax[i] * max)
          sms.sendSMS(`Bust out ${reps} pushups. Right now.`)
        }
      })
    })
  }
  schedule.scheduleJob('11 21 * * *', function () { // send text to get confirmation
    console.log('checking to see if they did the pushups')
    User.find({}, function (err, users) {
      if (err) return console.log(err)
      for (let user of users) {
        let message = 'Were you able to complete all of the sets? Respond Yes or No.'
        let number = user.phone
        sms.sendSMS(message, number)
      }
    })
  })
}

module.exports = scheduleWorkouts
