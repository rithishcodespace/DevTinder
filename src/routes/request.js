let express = require("express");
let requestRoute = express.Router();
let connectionRequestModel = require("../models/connectionRequest");
let userAuth = require("../middlewares/auth");


requestRoute.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        let accepted_status = ["interested","ignored"];

        if(!accepted_status.includes(status))
        {
            return res.status(400).send("invalid statu -> "+status);
        }

        const existingConnectionRequest = await connectionRequestModel.findOne({
            $or:[
                    {fromUserId,toUserId},
                    {fromUserId:toUserId,toUserId:fromUserId},
                    {fromUserId:fromUserId,toUserId:fromUserId}
            ]
        });

        let flagId = await connectionRequestModel.findOne({_id:fromUserId});

        if(!flagId)
        {
            res.status(400).send("user id not valid!");
        }

        if(existingConnectionRequest)
        {
            return res.status(400).send("connection request already exists!");
        }


        const connectionRequest = new connectionRequestModel({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();
        res.json({message : "connection request sent successfully!",data});
    }
    catch(error)
    {
        res.status(400).send(error.message);
    }
})

module.exports = requestRoute;