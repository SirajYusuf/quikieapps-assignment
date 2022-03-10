const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const register = async(req,res)=>{
    try{

        const user  = new User({
            name: req.body.name,
            email:req.body.email,
            password:await bcrypt.hash(req.body.password, 8),
            age:req.body.age
        })

        await User.create(user).then((data)=>{
            res.status(201).send({
                status: 201,
                message:"successfully created",
                data
            })
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send({
            status: 500,
            message:"Something went wrong please try again",
            err: err.message
        })
    }
}


const login = async(req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            return res.status(400).send({
                status: 400,
                message: "Unable to find email."
            })
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if (!passwordIsValid) {
            return res.status(400).send({
                status: 400,
                message: "Invalid Password!"
            })
        }
        var token = jwt.sign({ id: user._id}, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
        })
        user.token = token
        user.save()
        res.status(200).send({
            status: 200,
            Message: "Login successful",
            Data: user
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            status:500,
            message:"Something went wrong please try again",
            err: err.message
        })
    }
   
}

module.exports = {register,login}