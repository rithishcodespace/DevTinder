let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    emailId:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    age:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        enum:["male","female","others"],
        required : true
        
    }
    
},
{
    timestamps:true
})

module.exports = mongoose.model("User",userSchema); 