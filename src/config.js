const nodemailer = require('nodemailer');
module.exports = {

  config: {
    
    server: "yourip",
    user: "user",
    password: "passwd",

    connectionTimeout: 300000,
    requestTimeout: 300000,
    pool: {
        idleTimeoutMillis: 300000,
        max: 100
    },

    options: {
        port: 1433,//49161,
        database: 'Database',
        //connectionTimeout : 150000,
        //instancename: 'SQLEXPRESS' case when use express
      }
},

configoracle :{
  user: "oracleuser",  
  password: "oraclepasswd",  
  connectString: "(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = yourip)(PORT = port)) (CONNECT_DATA = (SERVER = DEDICATED)(SERVICE_NAME = your service name)))",
  extendedMetaData: true,

  poolTimeout: 60,
  poolMin: 10,
  poolMax: 25,
  queueRequests: true,
  queueTimeout: 600000,
  _enableStats: true

},


email : nodemailer.createTransport({
  service: 'Gmail',  
  auth: {
      user: 'specify e-mail default', 
      pass: 'your password mail'             
      } 
  })



}
