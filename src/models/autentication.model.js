const fileconfig  = require('../config'); 
var sql = require("mssql");
 

module.exports = (user,passwd,callback) => {
  
    sql.connect(fileconfig.config, function (err) {
        var request = new sql.Request();
        request.query(`SELECT * FROM logins where login = '${user}' and senha = '${passwd}'`, function (err, recordset) {
                try {
                if(recordset.length == 0){
                callback(null, false)
                }else{
                callback(null, true)
                }
            }
            catch(err){
            console.error(err)
            sql.close();
            }
        }); 
      });  
  
    

}