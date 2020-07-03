const jwt = require('jsonwebtoken');


module.exports = function(request, response, next){
    const token = request.header('token');
    if(!token) return response.status(401).json({message : "[Error] : Authentication Error"});
    try{
        const decoded = jwt.verify(token, "secret");
        if(request.params['userid'] == decoded.user.id) next();
        else response.status(200).json({message : 'Unauthorized'});
    }catch(e){
        response.status(401).json({message : "Invalid Token"});
    }
}