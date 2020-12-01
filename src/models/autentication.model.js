const fileconfig  = require('../config'); 
var sql = require("mssql");
 

function autentication (user,passwd,callback){
  
    sql.connect(fileconfig.config, function (err) {
        var request = new sql.Request();
        request.query(`SELECT * FROM xxxxxxxxxxx only login in where, skip password in sql for avoid sql injection `, function (err, recordset) {
                try {
 
                if(recordset.length == 0){
                callback(null, false)
                }else{
                 if (recordset[0].senha == passwd){
                callback(null, true)
                }else{
                callback(null, false) 
                }
                }
            }
            catch(err){
            console.error(err)
            sql.close();
            }
        }); 
      });  
  
}

module.exports = autentication;