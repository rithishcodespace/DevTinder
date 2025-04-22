let express = require("express");
let authRoute = express.Router();
let bcrypt =  require("bcrypt");
let userAuth = require("../middlewares/auth");
let User = require("../models/user");
let jwt = require("jsonwebtoken");
let {Validate} = require("../utils/validate")


authRoute.post("/signup",async (req,res)=>{
    const {firstName,lastName,emailId,password,age,gender} = req.body;
    try{
     Validate(req.body);
     let Password = await bcrypt.hash(password,10);
     const newuser = new User({firstName,lastName,emailId,password:Password,age,gender});
     await newuser.save();
     res.send("user logged in successfully!!");
    }
    catch(error)
    {
      res.status(400).send("there is an error in sigining you up!"+error.message);
    }
 });

authRoute.post("/login",async(req,res)=>{
    try{
        Validate(req.body);
        let user = await User.findOne({emailId: req.body.emailId});
        if(!user)
        {
        throw new Error("user not found");
        }
        else{
            const ispasswordvalid = await bcrypt.compare(req.body.password,user.password);
            if(!ispasswordvalid) return res.status(400).send("incorrect password!");
            var token = jwt.sign({_id:user._id},"Rithish@2006",{ expiresIn: "7d" });
            res.cookie("token",token);
            res.send("logged in successfully");
            
        }
    }
    catch(error)
    {
       return res.status(500).send("something went wrong"+error.message);
    }

})
authRoute.post("/logout",(req,res)=>{
    res.cookie("token",null,{expires: new Date(Date.now())});
    res.send("Logged out successfull!!");
})

module.exports = authRoute