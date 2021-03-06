const express = require('express')
const router = express.Router()

const scriptController = require('../controller/script.controller')

router.get('/admin/:name', scriptController.getScripts)
router.get('/client/:name', scriptController.getScript)
router.post('/', scriptController.createScript)
router.put('/', scriptController.editScript)
router.delete('/', scriptController.removeScript)

// Export the Router
module.exports = router