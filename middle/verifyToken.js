const jwt = require("jsonwebtoken");


const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token;
    
    //  console.log(req);
    console.log(req.headers.token);
    if(authHeader){
        // const token = authHeader.split(" ")[1]
        jwt.verify(authHeader, process.env.TOKEN_KEY, (err,user)=>{
            if(err) res.status(403).json("Token is not valid");
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("you are authorized for this page");
    }
};





module.exports = { verifyToken 
  
};