const express = require("express");
const paymentRouter = express.Router();
const userAuth = require("../middlewares/auth");
const razorpayInstance = require("../utils/razorpay");

// sends secret_keys(via razorpayInstance) + hit razorpay to create an order
paymentRouter.post("/payment/create_order", async(req, res) => { 
  try{
    // order data is passed to razorpay, and it returns the promise object (data passed + order_id, offer_id, created_at etc..)
    const order = await razorpayInstance.orders.create({
        "amount":5000, 
        "currency":"INR",
        "receipt":"reciept#1",
        "partial_payment": false,
        "notes":{
            "firstName":"name1",
            "lastName":"name2",
            "membershipType":"silver"
        }
    })
    // save it in my database
    console.log(order);

    // Returns back my order details to frontend
    res.json({msg:order})
  }
  catch(error){
    res.status(500).json({
      message: "Order creation failed",
      error: error.error || error.message
    });
  }
})

module.exports = paymentRouter;