const mongoose = require('mongoose')

const salonSchema = new mongoose.Schema({
    salon:{
        type: String,
        default:null
    },
    location:{
        type: String,
        default:null
    },
    employees:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
    }],
    ratings:{
        type:Number,
        default: 5.0
    },
    teamSize: {
        type: Number,
        default:1
    }
},{
    timestamps: true
})

const Salons = mongoose.model('Salons', salonSchema,'Salons')

module.exports= Salons