/* eslint-env mocha */
require('dotenv').config()

const schedule = require('../app/core/schedule')
const sinon = require('sinon')

describe('node-scheduler', function () {
  it('should have events scheduled', function (done) {
    let spiedScheduler = sinon.spy(schedule, 'scheduleEvents')
    schedule.scheduleEvents()
    sinon.assert.calledOnce(spiedScheduler)
    spiedScheduler.restore()
    done()
  })
})
