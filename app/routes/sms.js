
const ACCOUNT_SID = process.env.ACCOUNT_SID
const AUTH_TOKEN = process.env.AUTH_TOKEN
const twilio = require('twilio')(ACCOUNT_SID, AUTH_TOKEN)
const User = require('../models/user')

let express = require('express')
let router = express.Router()
router.post('/', function (req, res) {
  handleSMS(req.body)
})

let handleSMS = (message) => {
  let messageContent = message.Body
  let yesResponses = ['yes', 'yeah', 'ye', 'yea', 'fuck yeah', 'fuck yea', 'hell yeah', 'hell yea']
  let noResponses = ['nope', 'no', 'hell no', 'fuck no', 'nah']
  console.log('=========== messageContent ===========', JSON.stringify(messageContent, null, 4))
  let timeNow = new Date()
  let hours = timeNow.getHours()
  let minutes = timeNow.getMinutes()
  if (hours === 9 && minutes >= 17 && minutes <= 30) {
    if (yesResponses.indexOf(messageContent) !== -1) {
      User.completeWorkout(message.From)
    } else if (noResponses.indexOf(messageContent) !== -1) {
      // ignore message until we write a proper ignore handler
    }
  }
}

module.exports = router

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
