const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minlength:4,
        maxlength:15,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error('User name should should have 4-15 characters with no numbers or special characters')
            }
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 18,
        validate(value) {
            if(value < 18) {
                throw new Error("Age must be a above eighteen")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain the word "password"')
            }
        }
    },
    token:{
        type:String
    }
},{
    timestamps: true
})

const User = mongoose.model('User', userSchema,'user')

module.exports= User