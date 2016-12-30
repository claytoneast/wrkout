const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./app/models/user')
const path = require('path')
const bodyParser = require('body-parser')
const schedule = require('node-schedule')

mongoose.connect('mongodb://localhost/wrkoutDev')

app.use(express.static('app/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.Promise = global.Promise

app.listen(3000, function () {
  console.log('listening on 3000')
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app/views/index.html'))
})

app.post('/workout', (req, res) => {
  console.log(req.body)
  let newUser = new User({
    phone: req.body.phone,
    maxPushups: req.body.maxPushups,
    timeOfWorkout: req.body.timeOfWorkout
  })
  newUser.save(function (err, savedUser) {
    if (err) return console.error(err)
    scheduleSingleUserWorkouts(savedUser)
  })
  res.send('nice you made it')
})

let scheduleAllUserWorkouts = () => {
  schedule.scheduleJob('0 3 * * *', function () { // set all
    console.log('scheduling all user events now')
    User.find({}, function (err, users) {
      if (err) return console.log(err)
      for (let user of users) {
        console.log('stuff')
        scheduleSingleUserWorkouts(user)
      }
    })
  })
}

scheduleAllUserWorkouts()

let scheduleSingleUserWorkouts = (user) => {
  let max = user.maxPushups
  // let timeOfWorkout = user.timeOfWorkout
  let sets = [Math.floor(0.4 * max),
    Math.floor(0.5 * max),
    Math.floor(0.5 * max),
    Math.floor(0.5 * max),
    Math.floor(0.5 * max),
    Math.floor(0.33 * max)]
  let dateNow = new Date(Date.now())
  for (let i = 0; i < 6; i++) {
    let workoutTimeInCron = getTestEventDates(dateNow, i)
    schedule.scheduleJob(workoutTimeInCron, function () {
      console.log('=========== i ===========', JSON.stringify(i, null, 4))
      console.log('=========== sets[i] ===========', JSON.stringify(sets[i], null, 4))
    })
  }
  // *    *    *    *    *    *
  // ┬    ┬    ┬    ┬    ┬    ┬
  // │    │    │    │    │    |
  // │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
  // │    │    │    │    └───── month (1 - 12)
  // │    │    │    └────────── day of month (1 - 31)
  // │    │    └─────────────── hour (0 - 23)
  // │    └──────────────────── minute (0 - 59)
  // └───────────────────────── second (OPTIONAL)
}

// let getEventDates = (dateNow, workoutSetsIncrement) => {
  // let workoutParams = []
  // let nextMinute = dateNow.getMinutes() + 1 + (2 * workoutSetsIncrement) // minutes plus a 2 min offset for each item
  // workoutParams.push(nextMinute)
  // workoutParams.push(dateNow.getHours())
  // workoutParams.push(dateNow.getDate())
  // workoutParams.push(dateNow.getMonth() + 1)
  // workoutParams.push('*')
  // let cronDate = workoutParams.join(' ')
  // console.log('=========== workoutParams ===========', JSON.stringify(workoutParams, null, 4))
  // console.log('=========== cronDate ===========', JSON.stringify(cronDate, null, 4))
  // return cronDate
// }

let getTestEventDates = (dateNow, workoutSetsIncrement) => {
  let workoutParams = []
  let nextSecond = dateNow.getSeconds() + (1 * workoutSetsIncrement)
  workoutParams.push(nextSecond)
  let nextMinute = dateNow.getMinutes() // minutes plus a 2 min offset for each item
  workoutParams.push(nextMinute)
  workoutParams.push(dateNow.getHours())
  workoutParams.push(dateNow.getDate())
  workoutParams.push(dateNow.getMonth() + 1)
  workoutParams.push('*')
  let cronDate = workoutParams.join(' ')
  console.log('=========== workoutParams ===========', JSON.stringify(workoutParams, null, 4))
  console.log('=========== cronDate ===========', JSON.stringify(cronDate, null, 4))
  return cronDate
}
