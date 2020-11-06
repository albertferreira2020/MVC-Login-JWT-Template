var path = require('path');
module.exports = {
    
    get:(req,res) =>{
        res.sendFile(__dirname + '/cobranca.html', {name:checktoken});
    }

}