module.exports = {
    
    get:(req,res) =>{
        res.status(200).json({ auth: false, token: null });
    }

}