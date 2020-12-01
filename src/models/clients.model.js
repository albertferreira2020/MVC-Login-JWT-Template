const fileconfig  = require('../config'); 
var oracledb = require('oracledb');  
 
 



function clients (inicio, fim, cgccpf, contrato, carteira, dias, callback) {
 

 
  let promise = new Promise(function(resolve, reject) {
 
    oracledb.getConnection(fileconfig.configoracle, function(err, connection){
    if (err) { 
    console.error('error: ' + err);
    resolve(callback(err, null))}


 
    
  
querysql =   `
select *

from xxxxxxxxxxxxxxxx 

      `  
      

        connection.execute(querysql , {}, { outFormat: oracledb.OBJECT },function(err, recordset){
        if (err) { 
          console.error(err);
          resolve(callback(err, null))

          connection.close(function(err) {
            if (err) {
              console.log('Error closing connection', err);
            } else {
              //console.log('Connection closed');
            }
          });


        }else{
           resolve(callback(null, recordset))
           connection.close(function(err) {
            if (err) {
              console.log('Error closing connection', err);
            } else {
              //console.log('Connection closed');
            }
          });


      }
         
         
      });

      });


    //////////////fecha callback
    });

}

module.exports = clients;