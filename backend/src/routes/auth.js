let express = require("express");
let authRoute = express.Router();
let bcrypt =  require("bcrypt");
let userAuth = require("../middlewares/auth");
let User = require("../models/user");
let jwt = require("jsonwebtoken");
let {Validate} = require("../utils/validate")


authRoute.post("/signup",async (req,res)=>{
    let {firstName,lastName,emailId,password,age,gender} = req.body;
    try{
     Validate(req.body);
     password = await bcrypt.hash(password,10);
     const newuser = new User({firstName,lastName,emailId,password,age,gender});
     const savedUser = await newuser.save();
     
     var token = jwt.sign({_id:savedUser._id},process.env.JWT_SECRET,{ expiresIn: "1hr" });
     res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000
    });

     res.json({  
        message:"User signup successfully!",
        "userDetails":savedUser
     });
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
          res.status(404).send("user not found!");
        }
        else{
            const ispasswordvalid = await bcrypt.compare(req.body.password,user.password);
            if(!ispasswordvalid) return res.status(400).send("incorrect password!");
            var token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{ expiresIn: "1hr" });
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,        // true only in HTTPS
                sameSite: "lax",      // IMPORTANT for localhost
                maxAge: 60 * 60 * 1000 // 1 hour
            });
            res.send(user);
            
        }
    }
    catch(error)
    {
       return res.status(500).send(error.message + "!");
    }

})
authRoute.delete("/logout",(req,res)=>{
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    res.status(200).send("Logged out successfull!!");
})

module.exports = authRoute