const fileconfig  = require('../config'); 
var sql = require("mssql");
 

function SaveModel (modelo,texto,callback){
    
  
    sql.connect(fileconfig.config, function (err) {
        var request = new sql.Request();
        request.query(`UPDATE xxxxxxxxxxxx' `, function (err, recordset) {
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

module.exports = SaveModel;