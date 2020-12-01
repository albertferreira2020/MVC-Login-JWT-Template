const clients = require('../models/clients.model');
  
module.exports = {
    post:(req, res, next) => {
  
           clients(req.body.inicio,req.body.fim,req.body.cgccpf,req.body.contrato,req.body.carteira,req.body.dias, (err, result) => {
            console.log('return sucess from model!')
            if(err){
              res.status(200).send(`alert('${err}')`);
            }else{
            res.status(200).send( `CreateTableFromJSON(${JSON.stringify(result.rows)}) ` ); 
            }
        })    

      }

}