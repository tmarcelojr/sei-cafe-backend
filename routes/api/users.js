// /routes/api/users.js
const express = require('express')
const router = express.Router()
const { checkToken, dataController } = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// POST /api/users
router.post('/', dataController.create)
// POST /api/users/login
router.post('/login', dataController.login)

// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, checkToken)

module.exports = router