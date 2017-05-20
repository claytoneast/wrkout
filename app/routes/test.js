var express = require('express')
var router = express.Router()

// define the about route
router.get('/', function (req, res) {
  res.send('About birds')
})

router.get('/super', function (req, res) {
  res.send('test super route')
})

module.exports = router
