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

// Show the persons who are in our connections
userRoute.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const availableConnections = await connectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ]
    })
      .populate("fromUserId", ["firstName", "lastName"])
      .populate("toUserId", ["firstName", "lastName"]);

    if (!availableConnections.length) {
      return res.status(404).send("Error: no available connections");
    }

    const data = [
      ...new Set(availableConnections.map((row) => 
        row.fromUserId._id.toString() === loggedInUser._id.toString()
          ? JSON.stringify(row.toUserId)
          : JSON.stringify(row.fromUserId)
      ))
    ].map((user) => JSON.parse(user));

    res.send(data);
  } catch (error) {
    res.status(500).send("Error in fetching available connections: " + error.message);
  }
});




//user feed it should not contain interested, rejected, accepted profiles\
//http://localhost:3000/feed?page=1&limit=10
///feed → Your route.

// ?page=1&limit=10 → Query parameters for pagination.

// page=1 → Get the first page.

// limit=10 → Show 10 users per page (max limit is 50 based on your code).

userRoute.get("/feed", userAuth, async (req, res) => {
  try {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    limit = limit > 50 ? 50 : limit;
    let skip = (page - 1) * limit;

    let loggedInUser = req.user._id;

    let connectionrequestedUsers = await connectionRequest.find({
      $or: [
        { fromUserId: loggedInUser },
        { toUserId: loggedInUser }
      ]
    }).select({ fromUserId: 1, toUserId: 1, firstName: 1, lastName: 1, age: 1, gender: 1 });

    let hideFromUserFeed = new Set();
    connectionrequestedUsers.forEach((req) => {
      hideFromUserFeed.add(req.fromUserId.toString());
      hideFromUserFeed.add(req.toUserId.toString());
    });

    let users = await Users.find({
      $and: [
        { _id: { $nin: Array.from(hideFromUserFeed) } },
        { _id: { $ne: loggedInUser } }
      ]
    })
      .select({ firstName: 1, lastName: 1, age: 1, gender: 1 })
      .skip(skip)
      .limit(limit);

    res.send(users);
  } catch (error) {
    return res.status(400).send("ERROR:" + error.message);
  }
});


module.exports = userRoute;