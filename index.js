
const compression = require('compression')
const express = require('express')
const path = require('path')
const Router = require('./src/routes/routes.route')

const app = express()
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
 
 app.listen(5000, function () {
    console.log('Server is running port 5000..');
});
