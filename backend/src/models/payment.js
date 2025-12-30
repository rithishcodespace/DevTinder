const mongoose = require("mongoose");

const paymentShema = new mongoose.Schema({ // storing the order created by RazorPay
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User", // populate <-> joins
        required: true
    },
    paymentId:{
        type: String // not given required, since payment may not occur
    },
    orderId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    receipt:{
        type:String,
        required:true
    },
    notes:{
        firstName:{
            type:String
        },
        lastName:{
            type:String,
        },
        membershipType:{
            type:String
        }
    }
}, {timestamps:true})

const paymentModel = new mongoose.model("Payment",paymentShema);

module.exports = paymentModel;