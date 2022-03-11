const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    postBody:{
        type: String,
        required: true,
    },
    media:{
        type:String
    },
    private: {
        type: Boolean,
        required:true,
    }
},{
    timestamps: true
})

const Posts = mongoose.model('Posts', postSchema,'posts')

module.exports= Posts