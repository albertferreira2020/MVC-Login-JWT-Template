const descriptionclients = require('../models/descriptions.model');
  
module.exports = {

    post:(req, res, next) => {
  
            descriptionclients(req.body.id,req.body.inicio,req.body.fim, (err, result) => {
            if(err){
              res.status(200).send(`alert('${err}')`);
            }else{
            res.status(200).send(`CreateTableFromJSONTitulos(${JSON.stringify(result.rows)})`); 
            }
        })    

      }

}