require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const schedule = require('./app/core/schedule')
const routes = require('./app/routes/router')
const dbConfigFile = require('./config/db.json')
const DB_URL = dbConfigFile[`${process.env.NODE_ENV}`].dbUrl

mongoose.connect(DB_URL)

app.use(express.static('app/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.Promise = global.Promise

app.listen(3000, function () {
  console.log('listening on 3000')
})

app.use('/', routes)

schedule.scheduleEvents()

module.exports = app
