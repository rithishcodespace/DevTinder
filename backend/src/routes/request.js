let express = require("express");
let requestRoute = express.Router();
let connectionRequestModel = require("../models/connectionRequest");
let userAuth = require("../middlewares/auth");
let userModel = require("../models/user");

// sending request
requestRoute.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        console.log(req.user);
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        let accepted_status = ["interested","ignored"];

        if(!accepted_status.includes(status))
        {
            return res.status(400).send("invalid status -> "+status);
        }

        const existingConnectionRequest = await connectionRequestModel.findOne({
            $or:[
                {fromUserId, toUserId},
                {fromUserId:toUserId, toUserId:fromUserId}
            ]
        });
        

        let flagId = await userModel.findOne({_id:fromUserId});

        if(!flagId)
        {
           return res.status(400).send("user id not valid!");
        }

        if(existingConnectionRequest)
        {
            return res.status(400).send("connection request already exists!");
        }


        const newConnectionRequest = new connectionRequestModel({
            fromUserId,
            toUserId,
            status
        });

        const data = await newConnectionRequest.save();
        res.json({message : "connection request sent successfully!",data});
    }
    catch(error)
    {
        return res.status(400).send(error.message);
    }
})

// accepting or rejecting the request
requestRoute.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
        let loggedInUser = req.user._id;
        const status = req.params.status;
        const requestId = req.params.requestId;
        const allowedStatus = ["accepted","rejected"];
        let flag = allowedStatus.includes(status);
        if(!flag)
        {
            return res.status(400).send("invalid request!");
        }
        const newConnectionRequest2 = await connectionRequestModel.findOne({_id:requestId,toUserId:loggedInUser,status:"interested"})
        if(!newConnectionRequest2)
        {
            return res.status(404).send("user not found!");
        }
        newConnectionRequest2.status = status;
        const datas = await newConnectionRequest2.save();
        res.json({
            message:"connection request accepted",
            datas
        })
    }
    catch(error)
    {
        return res.status(500).send(error.message);
    }
})

module.exports = requestRoute;