const User = require('../models/user')
const express = require('express')
const router = express.Router()

// define the about route
router.post('/', function (req, res) {
  console.log(req.body)
  let newUser = new User({
    phone: req.body.phone,
    maxPushups: req.body.maxPushups
  })
  newUser.save(function (err, savedUser) {
    if (err) return console.error(err)
  })
  res.send("You've successfully signed up for wkrout. Prepare to get strong.")
})

module.exports = router
