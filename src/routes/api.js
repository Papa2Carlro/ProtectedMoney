const express = require('express')
const router = express.Router()

const scripts = require('./scripts')

router.use('/script', scripts)

module.exports = router