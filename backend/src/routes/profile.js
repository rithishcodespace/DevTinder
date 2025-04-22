let express = require("express");
let profileRoute = express.Router();
let User = require("../config/database");
let userAuth = require("../middlewares/auth");
let {validateEditProfileData} = require("../utils/validate"); 

profileRoute.get("/profile/view",userAuth,async(req,res)=>{
    try{
        res.send(req.user);  
    }
    catch(error){
        return res.status(400).send("something went wrong in fetching all user data"+error.message);
    }
})

profileRoute.patch("/profile/edit",userAuth,async (req,res)=>{
    try{
        if(!validateEditProfileData(req.body))
        {
            throw new Error("invalid edit request!");
        }
        const loggedInUsers = req.user;
        Object.keys(req.body).forEach(key=>loggedInUsers[key]=req.body[key]);
        await loggedInUsers.save();
        res.send("profile updated succesfully");
    }
    catch(error)
    {
            res.status(400).send(error.message);
    }
})


module.exports = profileRoute;