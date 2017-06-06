
const ACCOUNT_SID = process.env.ACCOUNT_SID
const AUTH_TOKEN = process.env.AUTH_TOKEN
const twilio = require('twilio')(ACCOUNT_SID, AUTH_TOKEN)
const User = require('../models/user')
let express = require('express')

module.exports = function (app) {
  let router = express.router()
  app.use('/sms', router)

  router.post('/', function (req, res) {
    let messageContent = req.body.Body.downcase
    if (isItTime()) {
      if (messageContent === 'yes') {
        User.completeWorkout(req.body.From)
      } else if (messageContent === 'no') {
        // handle the lack of try
      }
    } else {
      console.log('Message not received in the timely hour, DISREGARDED.')
    }
  })
}

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
// =========== message =========== {
//     "ToCountry": "US",
//     "ToState": "CA",
//     "SmsMessageSid": "SM28770e0c074cf193c47f3804fc55db92",
//     "NumMedia": "0",
//     "ToCity": "BANNING",
//     "FromZip": "97701",
//     "SmsSid": "SM28770e0c074cf193c47f3804fc55db92",
//     "FromState": "OR",
//     "SmsStatus": "received",
//     "FromCity": "BEND",
//     "Body": "Odansjekd",
//     "FromCountry": "US",
//     "To": "+19094975688",
//     "ToZip": "92230",
//     "NumSegments": "1",
//     "MessageSid": "SM28770e0c074cf193c47f3804fc55db92",
//     "AccountSid": "AC436bd53f03ff3ad230a7b3fbe1ca4e92",
//     "From": "+15416784737",
//     "ApiVersion": "2010-04-01"
// }
