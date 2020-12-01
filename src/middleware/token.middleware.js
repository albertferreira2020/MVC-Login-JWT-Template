const jwt = require('jsonwebtoken');

function token (req, res, next) {
  
    var token = req.body.token 
    
    if (!token) return res.status(200).send(`alert('Erro: token não encontrado');top.location.href='/'`);
    jwt.verify(token, 'stringsecret', function(err, decoded) {
      if (err) return res.status(200).send(`alert('token Expirado');top.location.href='/'`);
      req.userId = decoded.id;
      next();
    });
    

}

module.exports = token;