const SaveModel = require('../models/SaveModels.model');
  
module.exports = {

    post:(req, res, next) => {
  
        SaveModel(req.body.modelo, req.body.texto , (err, result) => {
            if(err){
              res.status(200).send(`alert('${err}')`);
            }else{
            res.status(200).send( `alert('Modelo Salvo!')` ); 
            }
        })    

      }

}