const User = require('../models/userModel')
const Friend = require('../models/friendsModel')
const Posts = require('../models/postModel')


const addPost = async(req,res) =>{
    try{

        const post  = {
            postedBy: req._id,
            postBody:req.body.postBody,
            media: req.body.media,
            private: req.body.private
        }
        
        const data = await Posts.create(post)

        res.status(200).send({
            status:200,
            message: "post had been uploaded!",
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

const myPosts = async(req,res) =>{
    try{

        const data = await Posts.find({postedBy:req._id})
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

const getAllPosts = async(req,res)=>{
    try{

        const data = await Posts.find({private:false}).populate('postedBy',{name:1})
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

const community = async(req,res)=>{
    try{
        var page = parseInt(req.query.page)
        var size = parseInt(req.query.size)
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 5
        }
        var query = {}
        query.skip = size * (page - 1)
        query.limit = size
        query.page = page

        const friendsOne= await Friend.find({owner : req._id})
        const friendsTwo = await Friend.find({reciever : req._id})
        let resultOne = friendsOne.map(a => a.reciever);
        let resultwo = friendsTwo.map(b => b.owner)
        let result = [...resultOne,...resultwo]

        const users = await Posts.find({ postedBy: { $in: result }}).populate('postedBy',{name:1}).limit(query.limit).skip(query.skip)
        res.status(200).send({
            status:200,
            message: "Success",
            users
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

const deletePost = async(req,res)=>{
    try{
        
        const isValidUser = await Posts.findOne({_id:req.body._id,postedBy:req._id})
        if(isValidUser){
            await Posts.deleteOne({_id:req.body._id}).then((data)=>{
                res.status(200).send({
                    status: 200,
                    message: 'Post was successfully deleted!'
                })
            })
        }else{
            res.status(400).send({
                status: 400,
                message: 'You cannot delete this post!'
            })
        }
    }catch(err){

        console.log(err)
        res.status(500).send({
            status:500,
            message:"Something went wrong please try again",
            err: err.message
        })
    }
   
    
}

module.exports = {
    addPost,
    myPosts,
    getAllPosts,
    community,
    deletePost
}