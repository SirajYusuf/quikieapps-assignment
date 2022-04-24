const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    employeeName:{
        type: String,
        default: null
    }
},{
    timestamps: true
})

const Employee = mongoose.model('Employee', employeeSchema,'Employee')

module.exports= Employee