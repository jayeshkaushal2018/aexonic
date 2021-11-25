const mongoose = require('mongoose');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2"); //first step

var userSchema = new mongoose.Schema({
  
    fname:{
        type:String,
        required: true,
        min : 6,
        max: 255
    } ,
    lname:{
        type:String,
        required: true,
        min : 6,
        max: 255
    } ,
    email:{
        type:String,
        required: true,
        min : 6,
        max: 255
    },
    password: {
        type:String,
        required: true,
        max: 1024,
        min: 6
    },
    createDate:{
        type : Date,
        default: Date.now
    },
    address:{
        type:String,
        required: true,
        max: 255,
        min: 3
    },
    phone:{
        type:Number,
        required: true,
    
    },
    role:{
        type:String,
        reqired: true,
    }
});

userSchema.plugin(aggregatePaginate); //second step


module.exports = mongoose.model('User',userSchema);