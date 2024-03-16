const jwt= require("jsonwebtoken");

const JWT_SECRET = "iamlearningbackend"


const fetchuser=(req,res,next)=>{
let token = req.header("auth-token")
if(!token){
res.status(401).send({error:"Enter a valid token"})
}else{
    let data = jwt.verify(token,JWT_SECRET)
    console.log(data)
    req.user = data.user;
    next();
}
}

module.exports = fetchuser;