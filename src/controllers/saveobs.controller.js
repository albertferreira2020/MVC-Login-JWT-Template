const SaveObs = require('../models/SaveObs.model');
  
module.exports = {

    post:(req, res, next) => {
  
        SaveObs(req.body.id, req.body.user, req.body.obs , (err, result) => {
            if(err){
              res.status(200).send(`alert('${err}')`);
            }else{
            res.status(200).send( `
            alert('Salvo!');
            $('#obs').val('')
            ` ); 
            }
        })    

      }

}