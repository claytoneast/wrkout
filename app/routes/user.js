const User = require('../models/user')

let express = require('express')
let router = express.Router()

router.post('/users/create', (req, res) => {
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
