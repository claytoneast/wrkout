const schedule = require('node-schedule')
const speedupFactor = 100
const numberOfJobs = 200

let cronDate = (increment = 1) => {
  let dateNow = new Date(Date.now())
  let workoutParams = []
  let nextSecond = dateNow.getSeconds() + Math.floor(((1 / speedupFactor) * increment))
  let nextMinute = dateNow.getMinutes()
  if (nextSecond > 60) {
    let numberOfMinutes = Math.floor(nextSecond / 60)
    nextMinute += numberOfMinutes
    nextSecond = nextSecond % 60
  }
  workoutParams.push(nextSecond)
  workoutParams.push(nextMinute)
  workoutParams.push(dateNow.getHours())
  workoutParams.push(dateNow.getDate())
  workoutParams.push(dateNow.getMonth() + 1) // 0-11 month based
  workoutParams.push('*')
  let cronDate = workoutParams.join(' ')
  return cronDate
}

let jobsRun = 0
for (let i = 1; i <= numberOfJobs; i++) {
  // console.log(`scheduling job number ${i}`)
  let cronDateForJob = cronDate(i)
  schedule.scheduleJob(cronDateForJob, function () {
    // console.log('job has been run')
    jobsRun += 1
  })
}

setTimeout(function () {
  console.log(`number of jobs run: ${jobsRun}`)
}, ((numberOfJobs * 1000 / speedupFactor) + 1000))

// seems to scale to 60,000 jobs
