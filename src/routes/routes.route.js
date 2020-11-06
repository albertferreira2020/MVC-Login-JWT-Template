const express = require('express')
const router = express.Router();
const token = require('../middleware/token.middleware');

const index = require('../controllers/index.controller')
const login = require('../controllers/login.controller')
const logout = require('../controllers/logout.controller')
const main = require('../controllers/main.controller')

router.get('/', index.get) 
router.get('/login', login.get) 
router.get('/logout', logout.get)
router.get('/main',token, main.get)

module.exports = router;