const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Friend = require('../models/friendsModel')

const register = async(req,res)=>{
    try{
        const isEmailExist = await User.findOne({email:req.body.email})
        if(isEmailExist){
            return res.status(400).send({
                status: 400,
                message:'This email is already registered'
            })
        }

        const user  = new User({
            name: req.body.name,
            email:req.body.email,
            password:await bcrypt.hash(req.body.password, 8),
            age:req.body.age
        })

       const data = await User.create(user)
        res.status(201).send({
            status: 201,
            message:"successfully created",
            data
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

const getUsers = async(req,res) =>{
    try{

        const data = await User.find()

        res.status(201).send({
            status: 201,
            message:"success",
            data
        })

    }catch(err){

        res.status(500).send({
            stauts: 500,
            message: err.message || "something went wrong please try again"
        })
    }
}

const Suggestions = async(req,res)=>{
    try{

        const friendsOne= await Friend.find({owner : req._id})
        const friendsTwo = await Friend.find({reciever : req._id})
        let resultOne = friendsOne.map(a => a.reciever);
        let resultwo = friendsTwo.map(b => b.owner)
        let result = [req._id,...resultOne,...resultwo]
        
        const users = await User.find({ _id: { $nin: result } })
        res.status(200).send({
            status:200,
            message: "Success",
            users
        })

    }catch(err){

        res.status(500).send({
            stauts: 500,
            message: err.message || "something went wrong please try again"
        })
    }

}

const addFriend = async(req,res) =>{
    try{
        if(req._id == req.body.reciever){
            throw new Error ('error')
        }

        const filter  = {
            owner: req._id,
            reciever:req.body.reciever
        }

        const isAlreadyRequested = await Friend.findOne(filter)

        if(isAlreadyRequested){
            return res.status(400).send({
                status:400,
                message: "You have already sent request to this person"
            })
        }
        
        const data = await Friend.create(filter)

        res.status(200).send({
            status:200,
            message: "Friend request sent!",
            data
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

const acceptRequest = async(req,res) =>{
    try{

        const filter  = {
            _id:req.body._id,
            reciever:req._id
        }

        const data = await Friend.findOneAndUpdate(filter,
            {
                $set:{status:'friends'}
            },{new:true})

        if(!data){
            throw new Error('somthing went wrong')
        }

        res.status(200).send({
            status:200,
            message: "Friend request Accepted!",
            data
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

const friendRequests = async(req,res) =>{
    try{
        const filter  = {
            reciever:req._id,
            status:'requested'            
        }

        const data = await Friend.find(filter).populate("owner",{name:1}).populate("reciever",{name:1})

        res.status(200).send({
            status:200,
            message: "Success!",
            data
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

const getFriends = async(req,res) =>{
    try{

        const filter  = {
            $or: [{ owner:req._id }, { reciever: req._id}],
            status:'friends'            
        }

        const data = await Friend.find(filter).populate("owner",{name:1}).populate("reciever",{name:1})

        res.status(200).send({
            status:200,
            message: "Success!",
            data
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

const rejectRequest = async(req,res)=>{
    try{
        const filter = {
            _id:req.body._id,
            status:'requested'
        }
        await Friend.deleteOne(filter)
        res.status(200).send({
            status: 200,
            message: "You have rejected this request"
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            status: 500,
            message: err.message
        })
    }
}

const removeFriend = async(req,res)=>{
    try{
        const filter = {
            _id:req.body._id,
            status:'friends'
        }
        await Friend.deleteOne(filter)
        res.status(200).send({
            status: 200,
            message: "Successfully removed"
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            status: 500,
            message: err.message
        })
    }
}

module.exports = {register,login,getUsers,addFriend,acceptRequest,getFriends,friendRequests,rejectRequest,Suggestions,removeFriend}