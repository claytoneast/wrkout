const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./app/models/user')
const path = require('path')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/myappdatabase')

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
  let newUser = new User({
    number: req.body.number,
    maxPushups: req.body.maxPushups,
    timeOfWorkout: req.body.timeOfWorkout
  })
  newUser.save(function (err, savedUser) {
    if (err) return console.error(err)
    console.dir(savedUser)
  })
  // res.send()
})
