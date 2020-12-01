const fileconfig  = require('../config'); 
var sql = require("mssql");
 

function getmodels (callback){
  
    sql.connect(fileconfig.config, function (err) {
        var request = new sql.Request();
        request.query(`SELECT * FROM xxxx `, function (err, recordset) {
                try {
                
                callback(null, recordset)
            }
            catch(err){
                callback(err, false)
            console.error(err)
            sql.close();
            }
        }); 
      });  
  
}

module.exports = getmodels;