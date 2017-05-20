require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const schedule = require('./app/core/schedule')
const usersRouter = require('./app/routes/user')
const smsRouter = require('./app/routes/sms')
mongoose.connect('mongodb://localhost/wrkoutDev')

app.use(express.static('app/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.Promise = global.Promise

app.use('/users', usersRouter)
app.use('/sms', smsRouter)

app.listen(3000, function () {
  console.log('listening on 3000')
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app/views/index.html'))
})

schedule()
