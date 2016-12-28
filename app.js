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
  let max = user.maxPushups
  let timeOfWorkout = user.timeOfWorkout
  let sets = []
  sets[0] = Math.floor(0.4 * max)
  sets[1] = Math.floor(0.5 * max)
  sets[2] = Math.floor(0.5 * max)
  sets[3] = Math.floor(0.5 * max)
  sets[4] = Math.floor(0.5 * max)
  sets[5] = Math.floor(0.33 * max)
  // console.log('sets', sets)
  let dateNow = new Date(Date.now())
  let workoutParams = {}
  workoutParams.minute = timeOfWorkout[3] + timeOfWorkout[4]
  workoutParams.hour = timeOfWorkout[0] + timeOfWorkout[1]
  workoutParams.day = dateNow.getDate() // get current day
  workoutParams.month = dateNow.getMonth() + 1
  // console.log('workout date obj', workoutParams)
  let workoutsArray = [workoutParams]
  debugger
  for (let i = 1; i < 6; i++) {
    let nextParams = workoutParams
    let prevMinute = parseInt(nextParams.minute, 10)
    let nextMinute = (prevMinute + (2 * i)).toString()
    console.log('next minute', nextMinute)
    nextParams.minute = nextMinute
    workoutsArray.push(nextParams)
  }
  console.log('final array', workoutsArray)
}
//
// let rule = new schedule.RecurrenceRule()
// rule.second = 1
//
// schedule.scheduleJob(rule, function () {
//   createUserPushupEvents()
// })
//
// let createUserPushupEvents = () => {
//   User.find({}, function (err, users) {
//     if (err) return console.log(err)
//     // console.log('made it to the function')
//     for (let user of users) {
//       // console.log('going through the users')
//       let max = user.maxPushups
//       let sets = []
//       sets[0] = Math.floor(0.4 * max)
//       sets[1] = Math.floor(0.5 * max)
//       sets[2] = Math.floor(0.5 * max)
//       sets[3] = Math.floor(0.5 * max)
//       sets[4] = Math.floor(0.5 * max)
//       sets[5] = Math.floor(0.33 * max)
//       console.log('sets', sets)
//     }
//   })
// }
