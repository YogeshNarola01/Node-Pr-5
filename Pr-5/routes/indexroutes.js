const express = require('express')
const router = express.Router()
router.use('/',require('../routes/movieroutes'))
module.exports = router