const express = require('express')
const router = express.Router();

const token = require('../middleware/token.middleware');
const index = require('../controllers/index.controller')
const login = require('../controllers/login.controller')
const logout = require('../controllers/logout.controller')
const main = require('../controllers/main.controller')
const validate = require('../controllers/validate.controller')
const message = require('../controllers/message.controller')
const clients = require('../controllers/clients.controller')
const savemodels = require('../controllers/savemodels.controller')
const getmodels = require('../controllers/getmodels.controller')
const sendmails = require('../controllers/sendmails.controller')
const descriptions = require('../controllers/descriptions.controller')
const saveobs = require('../controllers/saveobs.controller')
const history = require('../controllers/history.controller')

router.get('/', index.get) 
router.post('/login', login.post)  
router.get('/logout', logout.get)
router.get('/main', main.get)
router.post('/validate',token, validate.post)
router.get('/message', message.get)
router.post('/clients',token, clients.post)
router.post('/savemodels',token, savemodels.post)
router.post('/getmodels',token, getmodels.post)
router.post('/sendmails',token, sendmails.post)
router.post('/descriptions',token, descriptions.post)
router.post('/saveobs',token, saveobs.post)
router.post('/history',token, history.post)


module.exports = router;