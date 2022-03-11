const express = require('express')
const router = new express.Router()
const {register, login, getUsers, addFriend, acceptRequest, getFriends, friendRequests, Suggestions, rejectRequest, removeFriend} = require('../controller/userController')
const {addPost, myPosts, getAllPosts, community, deletePost} = require('../controller/postController')
const auth = require('../middleware/auth')

//user routes
router.post('/signup',register)
router.post('/login',login)


//friends routes
router.get('/friendsList',auth,getFriends)
router.post('/friendsList/addFriend',auth,addFriend)
router.delete('/friendsList/removeFriend',auth,removeFriend)

router.get('/friendRequests',auth,friendRequests)
router.post('/friendRequests/acceptRequest',auth,acceptRequest)
router.delete('/friendRequests/rejectRequest',auth,rejectRequest)

router.get('/suggestions',auth,Suggestions)

//uploadImageUtility
const uploadFile=require('../utils/multer');

//UploadFileFunctionality
const multer = require("multer");
const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
})
const upload = multer({ storage: storage }).single('file');


//post routes
router.post('/uploadFile',auth,upload,uploadFile)


router.post('/myProfile/addPost',auth,addPost)
router.get('/myProfile/posts',auth,myPosts)
router.delete('/myProfile/deletePost',auth,deletePost)

router.get('/community',auth,community)


//personal
router.get('/getUsers',getUsers)
router.get('/getAllPosts',auth,getAllPosts)

module.exports = router