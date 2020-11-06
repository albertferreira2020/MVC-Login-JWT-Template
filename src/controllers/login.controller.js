const jwt = require('jsonwebtoken');
const autentication = require('../models/autentication.model');

module.exports = {

    get:(req, res, next) => {

        autentication(req.params.user,req.params.pwd, (err, result) => {
           if(result){
           var token = jwt.sign({data: req.params.user}, 'stringsecret', { expiresIn: '8h' });
           res.status(200).send({ auth: true, token: token });
           }else{
           res.status(200).send({ auth: false, token: null });
           }

        })    

      }

}