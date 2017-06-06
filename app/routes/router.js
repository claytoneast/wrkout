const User = require('../models/user')

var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.send('dumb as hell')
})

router.post('/sms', function (req, res) {
  let messageContent = req.body.Body.downcase
  if (isItTime()) {
    if (messageContent === 'yes') {
      User.completeWorkout(req.body.From)
    } else if (messageContent === 'no') {
      // handle the lack of try
    }
    res.sendStatus(200)
  } else {
    res.send('stuff')
    console.log('Message not received in the timely hour, DISREGARDED.')
  }
})

module.exports = router

function isItTime () {
  if (process.env.NODE_ENV === 'test') {
    return true
  } else {
    let timeNow = new Date()
    let hours = timeNow.getHours()
    let minutes = timeNow.getMinutes()
    return hours === 9 && minutes >= 17 && minutes <= 30
  }
}
