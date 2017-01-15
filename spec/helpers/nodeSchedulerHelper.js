let cronDate = () => {
  let dateNow = new Date(Date.now())
  let workoutParams = []
  let nextSecond = dateNow.getSeconds() + (1)
  workoutParams.push(nextSecond)
  let nextMinute = dateNow.getMinutes()
  workoutParams.push(nextMinute)
  workoutParams.push(dateNow.getHours())
  workoutParams.push(dateNow.getDate())
  workoutParams.push(dateNow.getMonth() + 1) // 0-11 month based
  workoutParams.push('*')
  let cronDate = workoutParams.join(' ')
  return cronDate
}

exports.cronDate = cronDate
