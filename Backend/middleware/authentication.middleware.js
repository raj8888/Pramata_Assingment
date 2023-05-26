require('dotenv').config()
var jwt = require('jsonwebtoken');

const authenticate=(req,res,next)=>{
    let token=req.headers.authorization?.split(" ")[1]
    if(!token){
        res.status(201).send({"Message":"Please Login Again"})
    }else{
        var decoded = jwt.verify(token, "masai");
       if(decoded){
        let userID=decoded.userId
        req.body.userId=userID
        next()
       }else{
        res.status(201).send({"Message":"Please Login Again"})
       }
    }
}

module.exports={
    authenticate
}