const jwt = require('jsonwebtoken');
const autentication = require('../models/autentication.model');
  
module.exports = {

    post:(req, res, next) => {
  
           autentication(req.body.username,req.body.password, (err, result) => {
             
           if(result){
           var token = jwt.sign({data: req.body.username}, 'stringsecret', { expiresIn: '8h' });
           //res.status(200).send({ auth: true, token: token });
           var JS_Script = `
              localStorage.setItem('user', '${req.body.username}');
              localStorage.setItem('token', '${token}');
              top.location.href='/main' 
           `
           res.status(200).send(JS_Script);

           }else{
            var JS_Script = `
            $('#errologin').html('Erro: Falha durante a autenticação');
            setTimeout(() => {$('#errologin').html('');$('#btlogin').text('Login');}, 5000)    
            `
            res.status(200).send(JS_Script);
         }

        })    

      }

}