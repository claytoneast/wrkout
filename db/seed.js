(function () {
  require('dotenv').load()
  const mongoose = require('mongoose')
  const dbConfigFile = require('../config/db.json')
  const DB_URL = dbConfigFile[`${process.env.NODE_ENV}`].dbUrl
  mongoose.connect(DB_URL)
  mongoose.Promise = global.Promise
  const seedsFile = require('./seeds.json')
  const User = require('../app/models/user')

  for (let user of seedsFile.users) {
    User.create(user).then((savedUser) => {
      console.log('=========== savedUser ===========', JSON.stringify(savedUser, null, 4))
    }).catch((err) => {
      console.log(err)
    })
  }
  process.exit(0)
})()
