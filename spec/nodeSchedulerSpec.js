/* eslint-env jasmine */
const helpers = require('./helpers/nodeSchedulerHelper')
const schedule = require('node-schedule')

describe('node-schedule test suite', function () {
  let jobRan = false
  it('should schedule one job successfully', function (done) {
    let cronDateNow = helpers.cronDate()
    schedule.scheduleJob(cronDateNow, function () {
      jobRan = true
      expect(jobRan).toBe(true)
      done()
    })
  })
})
