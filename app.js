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
    scheduleUserTexts(savedUser)
  })
  res.send('nice you made it')
})

let scheduleUserTexts = (user) => {
  // let max = user.maxPushups
  // let timeOfWorkout = user.timeOfWorkout
  // let sets = []
  // sets[0] = Math.floor(0.4 * max)
  // sets[1] = Math.floor(0.5 * max)
  // sets[2] = Math.floor(0.5 * max)
  // sets[3] = Math.floor(0.5 * max)
  // sets[4] = Math.floor(0.5 * max)
  // sets[5] = Math.floor(0.33 * max)
  // workoutParams.minute = parseInt((timeOfWorkout[3] + timeOfWorkout[4]), 10) // get last two digits of the time picker-returned time, aka minutes
  // workoutParams.hour = parseInt((timeOfWorkout[0] + timeOfWorkout[1]), 10) // get first two digits of the time picker-returned time, aka hours
  let dateNow = new Date(Date.now())
  for (let i = 0; i < 6; i++) {
    let workoutParams = []
    let nextMinute = dateNow.getMinutes() + 1 + (2 * i) // minutes plus a 2 min offset for each item
    workoutParams.push(nextMinute)
    workoutParams.push(dateNow.getHours())
    workoutParams.push(dateNow.getDate())
    workoutParams.push(dateNow.getMonth() + 1)
    workoutParams.push('*')
    let cronDate = workoutParams.join(' ')
    console.log('=========== workoutParams ===========', JSON.stringify(workoutParams, null, 4))
    console.log('=========== cronDate ===========', JSON.stringify(cronDate, null, 4))
    let job = schedule.scheduleJob(cronDate, function () {
      console.log('event occuring')
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
