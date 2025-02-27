let mongoose = require("mongoose");
let connectionSchema = mongoose.Schema({
    fromUserId:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,    
    },
    toUserId:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
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