const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        index:true,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const chat = mongoose.model('chat',userSchema)
module.exports=chat