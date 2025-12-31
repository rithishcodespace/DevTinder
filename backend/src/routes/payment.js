const express = require("express");
const paymentRouter = express.Router();
const userAuth = require("../middlewares/auth");
const razorpayInstance = require("../utils/razorpay");
const paymentModel = require("../models/payment");
const userModel = require("../models/user");
const memberShipAmount = require("../utils/constants");
const crypto = require("crypto");

// sends secret_keys(via razorpayInstance) + hit razorpay to create an order
paymentRouter.post("/payment/create_order", userAuth, async(req, res) => { 
  try{
    // input validation
    let{memberShipType} = req.body;
    console.log("membership type:", memberShipType);
    console.log("membership amount object:", memberShipAmount);
    console.log("resolved amount:", memberShipAmount[memberShipType]);
    const{firstName, lastName, emailId} = req.user;
    if(firstName.trim() === "" || lastName.trim() === "" || emailId.trim() === ""){
        return res.status(500).send('userName or emailId is undefined!');
    }
    if(!memberShipType){
        return res.status(500).send('Invalid membership plan!');
    }
    memberShipType = memberShipType.toLowerCase();
    if(!['bronze','silver','gold'].includes(memberShipType)){
        return res.status(500).send('Invalid member ship type!');
    }
   
    // order data is passed to razorpay, and it returns the promise object (data passed + order_id, offer_id, created_at etc..)
    const order = await razorpayInstance.orders.create({
        "amount":memberShipAmount[memberShipType], 
        "currency":"INR",
        "receipt":"reciept#1",
        "partial_payment": false,
        "notes":{
            "firstName":"name1",
            "lastName":"name2",
            "emailId":"rithshvkv@gmail.com",
            "memberShipType": memberShipType // got amount from constants.js
        }
    })
    // save it in my database -> create model
    const payment = new paymentModel({
        userId: req.user._id,
        orderId: order.id,
        keyId: process.env.RAZORPAY_TEST_API_KEY_ID,
        status: order.status,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        notes: order.notes
    });

    const savedPayment = await payment.save(); // saves the payment object to db
    
    // Returns back my order details to frontend
    res.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_TEST_API_KEY_ID,
        notes: order.notes
    });
  }
  catch(error){
    res.status(500).json({
      message: "Order creation failed",
      error: error.error || error.message
    });
  }
})

// dont use userAuth, since razorpay will call this not you
paymentRouter.post("/payment/webhook", async (req,res) => { // webhook will call this api, on success/failure of payment, this api validates the webhook request (malicious or valid webhook from razorpay source)
    try{
       const body = JSON.stringify(req.body);
       
       const webhookSignature = req.headers["x-razorpay-signature"];

       const expectedSignature = crypto
       .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
       .update(body)
       .digest("hex");  

       const isWebhookValid = expectedSignature === webhookSignature;

       if(!isWebhookValid){
        return res.status(400).json({msg:"webhook signature is invalid!"})
       }

       // update the payment status in DB

       const paymentDetails = req.body.payload.payment.entity; // req.body()
       const payment = await paymentModel.findOne({orderId: paymentDetails.order_id})       
       payment.status = paymentDetails.status;
       await payment.save();

       // mark the user as premium
       
       if(req.body.event == "payment.captured"){ // success
            const user = await userModel.findOne({_id: payment.userId});
            user.isPremium = true;
            user.memberShipType = payment.notes.memberShipType;
            await user.save();
       }
       else if(req.body.event === "payment.failed"){ // failure
        
       }
       
       // return success response to razorpay (denoting we have successfully received the webhook) [IMPORTANT]
       res.status(200).json({msg:"Webhook received successfully!"});
    }
    catch(error){
        res.status(500).send(error.message);
    }
})

module.exports = paymentRouter;