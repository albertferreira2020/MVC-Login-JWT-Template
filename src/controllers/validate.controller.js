module.exports = {
    
    post:(req,res) =>{

        var JS_Script = `
        $('#autenticacao').html('Usuário Autenticado!') 
        `
        res.status(200).send(JS_Script);
    }

}