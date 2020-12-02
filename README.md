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
