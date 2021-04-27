const express = require('express')
const router = express.Router()

const scriptController = require('../controller/script.controller')

router.post('/', scriptController.createScript)
router.put('/', scriptController.editScript)
router.get('/admin/:name', scriptController.getScripts)
router.get('/client/:name', scriptController.getScript)

// Export the Router
module.exports = router