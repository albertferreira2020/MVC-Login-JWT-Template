const fileconfig  = require('../config'); 
var oracledb = require('oracledb');  
 


function descriptionclients (id, inicio, fim, callback) {
  
  let promise = new Promise(function(resolve, reject) {
 
    oracledb.getConnection(fileconfig.configoracle, function(err, connection){
    if (err) { 
    console.error('erro de conexão' + err);

    connection.close(function(err) {
      if (err) {
        console.log('Error closing connection', err);
      } else {
        //console.log('Connection closed');
      }
    });

    resolve(callback(err, null))
    }else{

 
  
querysql = `
        Select * from xxxx
      `  
        connection.execute(querysql , {}, { outFormat: oracledb.OBJECT },function(err, recordset){

        if (err) { 
          console.error(err);

          connection.close(function(err) {
            if (err) {
              console.log('Error closing connection', err);
            } else {
              //console.log('Connection closed');
            }
          });

          resolve(callback(err, null))
        }else{


          connection.close(function(err) {
            if (err) {
              console.log('Error closing connection', err);
            } else {
              //console.log('Connection closed');
            }
          });


           resolve(callback(null, recordset))
      }
         
         
      });



      }
      ///////////////
      });


    //////////////fecha callback
    });

}

module.exports = descriptionclients;