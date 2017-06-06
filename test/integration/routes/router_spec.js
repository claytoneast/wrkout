/* eslint-env mocha */

// let mongoose = require('mongoose')
let User = require('../../../app/models/user')
let chai = require('chai')
let expect = chai.expect
let chaiHttp = require('chai-http')
let app = require('../../../app.js')

chai.use(chaiHttp)

describe('SMS stuff', () => {
  beforeEach((done) => {
    User.remove({})
        .then(() => {
        })
        .catch((err) => {
          console.log(err)
        })
    done()
  })
  describe('/sms', function () {
    it('should return 200 for no goddamn good reason at all', function (done) {
      chai.request(app)
          .post('/sms')
          .send(TWILIO_INCOMING_STUB_GENERIC)
          .end((err, res) => {
            if (err) console.log(err)
            expect(res.status).to.equal(200)
            done()
          })
    })
    it('should run the workout completion handler successfully', function (done) {
      User.create({
        phone: '+15416784737',
        maxPushups: 20
      }).then((user) => {
        chai.request(app)
        .post('/sms')
        .send(TWILIO_INCOMING_STUB_YES)
        .end((err, res) => {
          if (err) console.log(err)
          setTimeout(() => { // wait for db to finish ops
            let updatedUser = User.findOne({id: user.id}).then(() => {
              expect(updatedUser.maxPushups).to.equal(22)
            })
          }, 200)
          expect(res.status).to.equal(200)
          done()
        })
      })
    })
  })
})

const TWILIO_INCOMING_STUB_GENERIC = {
  ToCountry: 'US',
  ToState: 'CA',
  SmsMessageSid: 'SM28770e0c074cf193c47f3804fc55db92',
  NumMedia: '0',
  ToCity: 'BANNING',
  FromZip: '97701',
  SmsSid: 'SM28770e0c074cf193c47f3804fc55db92',
  FromState: 'OR',
  SmsStatus: 'received',
  FromCity: 'BEND',
  Body: 'test body 1',
  FromCountry: 'US',
  To: '+15416784737',
  ToZip: '92230',
  NumSegments: '1',
  MessageSid: 'SM28770e0c074cf193c47f3804fc55db92',
  AccountSid: 'AC436bd53f03ff3ad230a7b3fbe1ca4e92',
  From: '+15416784737',
  ApiVersion: '2010-04-01'
}

const TWILIO_INCOMING_STUB_YES = {
  ToCountry: 'US',
  ToState: 'CA',
  SmsMessageSid: 'SM28770e0c074cf193c47f3804fc55db92',
  NumMedia: '0',
  ToCity: 'BANNING',
  FromZip: '97701',
  SmsSid: 'SM28770e0c074cf193c47f3804fc55db92',
  FromState: 'OR',
  SmsStatus: 'received',
  FromCity: 'BEND',
  Body: 'Yes',
  FromCountry: 'US',
  To: '+15416784737',
  ToZip: '92230',
  NumSegments: '1',
  MessageSid: 'SM28770e0c074cf193c47f3804fc55db92',
  AccountSid: 'AC436bd53f03ff3ad230a7b3fbe1ca4e92',
  From: '+15416784737',
  ApiVersion: '2010-04-01'
}
