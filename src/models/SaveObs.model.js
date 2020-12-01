const fileconfig  = require('../config'); 
var sql = require("mssql");
 

function SaveObs (id,user,obs,callback){
      
    sql.connect(fileconfig.config, function (err) {
        var request = new sql.Request();
        request.query(`INSERT INTO  xxxxxxxx`, function (err, recordset) {
                try {
                callback(null, true)
            }
            catch(err){
                callback(err, false)
            console.error(err)
            sql.close();
            }
        }); 
      });  
  
}

module.exports = SaveObs;