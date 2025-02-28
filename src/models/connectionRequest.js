let mongoose = require("mongoose");
let connectionSchema = mongoose.Schema({
    fromUserId:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,   
        ref : "User" // reference to the user collection 
    },
    toUserId:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    status:{
        type:String,
        enum:["ignored","accepted","rejected","interested"],
    }     
},
{
    timestamps : true
})

const connectionRequest = mongoose.model("connectionRequestModel",connectionSchema);

module.exports = connectionRequest;