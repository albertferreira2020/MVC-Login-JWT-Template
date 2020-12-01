const gethistory = require('../models/history.model');
  
module.exports = {

    post:(req, res, next) => {
  
      gethistory(req.body.id, (err, result) => {
            if(err){
              res.status(200).send(`alert('${err}')`);
            }else{
               
               res.status(200).send(`CreateTableHistoryFromJSON(${JSON.stringify(result)}) `);

            }
        })    

      }

}