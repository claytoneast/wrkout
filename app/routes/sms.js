const ACCOUNT_SID = process.env.ACCOUNT_SID
const AUTH_TOKEN = process.env.AUTH_TOKEN
const twilioClient = require('twilio')(ACCOUNT_SID, AUTH_TOKEN)

let express = require('express')
let router = express.Router()

router.post('/sms', function (req, res) {
  // Validate that this request really came from Twilio...
  // msg has been received, so we're going to fire off a function at the end
  // that takes the message id and then retrieves the message text via rest API to parse it.
  if (twilioClient.validateExpressRequest(req, AUTH_TOKEN)) {
    let twiml = new twilioClient.TwimlResponse()
    res.type('text/xml')
    res.send(twiml.toString())
    // handleSMS(req.body.)
  } else {
    res.send('You are not twilio. Buzz off.')
  }
})

module.exports = router
