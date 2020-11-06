module.exports = (req, res, next) => {
  
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    jwt.verify(token, app.get('superNode-auth'), function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      req.userId = decoded.id;
      console.log('token sucess!')
      next();
    });
    

}