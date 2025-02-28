let express = require("express");
let userRoute = express.Router();
let connectionRequest = require("../models/connectionRequest");
const userAuth = require("../middlewares/auth");
let Users = require("../models/user");
 
// received connection requests showing page
userRoute.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        let loggedInUser = req.user;
        let connectRequestReceived = await connectionRequest.find({
            toUserId:loggedInUser,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName"]);
        if(!connectRequestReceived)
        {
            throw new Error("no connection request found!");
        }
        res.send(connectRequestReceived);
    }
    catch(error)
    {
        res.status(400).send("ERROR:"+error.message);
    }
})

//show the persons who are in our connections
userRoute.get("/user/connections",userAuth,async(req,res)=>{
  try{
    let loggedInUser = req.user;
    let availableConnections = connectionRequest.find({
        $or: [
            {toUserId:loggedInUser,status:"accepted"},
            {fromUserId:loggedInUser,status:"accepted"},
        ]
    }).populate("fromUserId",["firstName,lastName"]).populate("toUserId",["firstName","lastName"]);

    const data = await availableConnections.map((row)=>{
        if(row.fromUserId._id.toString() == row.toUserId._id.toString())
        {
            return row.fromUserId;
        }
        return row.toUserId;
    })

    if(!availableConnections)
    {
        res.status(404).send("Error no available connections");
    }
    res.send(availableConnections);
  }
  catch(error)
  {
    res.status(404).send("Error in fetching available connectins:"+ error.message);
  }
})

//user feed it should not contain interested, rejected, accepted profiles\
userRoute.get("/feed",userAuth,async(req,res)=>{
    try{
      let  loggedInUser = req.user._id;
      let connectionrequestedUsers = await connectionRequest.find({
        $or : [{fromUserId:loggedInUser},
            {toUserId:loggedInUser}
        ]
      }).select("firstName","lastName","age","gender");

      let hideFromUserFeed = new Set();
      connectionrequestedUsers.forEach((req)=>{
        hideFromUserFeed.add(req.fromUserId.toString());
        hideFromUserFeed.add(req.toUserId.toString());
      })

      let users = await Users.find({
        $and : [{_id : {$nin : Array.from(hideFromUserFeed)}}, //ignore all the conection request 
          {_id: {$ne : loggedInUser}} //ignore the logged in user
        ]
      }).select("firstName","lastName","age","gender");
      res.send(users);
    }
    catch(error)
    {
        return res.status(400).send("ERROR:"+error.message);
    }
})

module.exports = userRoute;