const mongoose = require('mongoose')


const friendSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['friends', 'requested'],
        default: 'requested',
        required:true
    }
},{
    timestamps: true
})

const Friends = mongoose.model('Friends', friendSchema,'friends')

module.exports= Friends