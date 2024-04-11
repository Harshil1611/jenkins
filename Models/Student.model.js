const mongoose = require('mongoose')
const Schema = mongoose.Schema


const studentDetails = new Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true
    }
},{
    timestamps: true
})

const Student = mongoose.model('student',studentDetails)
module.exports = Student