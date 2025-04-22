const User = require("../models/user");
const jwt = require("jsonwebtoken");


const userAuth = async (req,res,next) =>{
  try
  {
    const {token} = req.cookies; //destructuring the token stored inside the cookie
    if(!token)return res.status(401).send("user not found!!");
    const decodedMessage = jwt.verify(token, "Rithish@2006");//decrypting the data stored inside the token
    const user = await User.findOne({_id:decodedMessage._id}); //search the user with the user_id got from jwt token
    if(!user)return res.status(401).send("User does not exist!!");
    req.user = user; //it provides the user information got using the token to the next middleware
    next();
  }
  catch(error)
  {
    res.status(400).send("Error occured in authentication"+error.message);
  }
}

module.exports = userAuth;