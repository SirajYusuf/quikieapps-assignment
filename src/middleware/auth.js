const jwt = require("jsonwebtoken")
const User = require('../models/userModel')

const auth = async (req, res,next) => {
    try{
    const token = req.header('Authorization')
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        })
    }
    const decode=jwt.verify(token, process.env.SECRET)
    const user= await User.findOne({_id:decode.id})
    
        req._id = decode.id
        next()
}
catch (err) {
    console.log(err)
    res.status(401).send({ 
        status:401,
        message:"Session Timed Out.Please login again"
     })
}
}

module.exports = auth