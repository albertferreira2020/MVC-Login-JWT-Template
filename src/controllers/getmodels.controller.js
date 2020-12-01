const getmodels = require('../models/getmodels.model');
  
module.exports = {

    post:(req, res, next) => {
  
        getmodels((err, result) => {
            if(err){
              res.status(200).send(`alert('${err}')`);
            }else{
               
               res.status(200).send(result);

            }
        })    

      }

}