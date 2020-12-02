# MVC-Login-JWT-Template
Creating template for login autentication, using node.js, JWT with protocol HTTPS and certified, using design partners mvc

```javascript

const compression = require('compression')
const express = require('express')
const path = require('path')
const Router = require('./src/routes/routes.route')
var bodyParser = require('body-parser');
const app = express();

const fs = require('fs');
const https = require('https');
const options = {
  key  : fs.readFileSync('certified/private.key'),
  cert : fs.readFileSync('certified/certificate.crt')
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(Router);
 
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});  
  
app.use(compression());
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'src/views')));

 https.createServer(options, app).listen(5002, function () {
  console.log('Server is running 5002..');
 })
 
 
 ///////////////////////////////// route file ////////////////////////////////

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
 
///////////////////////////////// middleware token file ////////////////////////////////
const jwt = require('jsonwebtoken');

function token (req, res, next) {
  
    var token = req.body.token 
    
    if (!token) return res.status(200).send(`alert('Erro: token não encontrado');top.location.href='/'`);
    jwt.verify(token, 'stringsecret', function(err, decoded) {
      if (err) return res.status(200).send(`alert('token Expirado');top.location.href='/'`);
      req.userId = decoded.id;
      next();
    });
    

}

module.exports = token;
