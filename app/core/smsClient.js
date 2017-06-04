const TWILIO_ACCOUNT_SID = process.env.ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.AUTH_TOKEN
const twilioNumber = process.env.twilioNumber
const twilioClient = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

let sendSMS = (message, number) => {
  twilioClient.sendMessage({
    to: number, // Any number Twilio can deliver to
    from: twilioNumber, // A number you bought from Twilio and can use for outbound communication
    body: message // body of the SMS message
  }, function (err, responseData) { // this function is executed when a response is received from Twilio
    if (!err) { // "err" is an error received during the request, if any
      // "responseData" is a JavaScript object containing data received from Twilio.
      // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
      // http://www.twilio.com/docs/api/rest/sending-sms#example-1
      console.log(responseData.from) // outputs "+14506667788"
      console.log(responseData.body) // outputs "word to your mother."
    }
  })
}

module.exports = sendSMS
