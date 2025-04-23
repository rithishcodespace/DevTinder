let validator = require("validator")

let Validate = (req) =>{
  if(!validator.isEmail(req.emailId))
  {
    throw new Error("invalid emailId!");
  }
  if(!validator.isStrongPassword(req.password))
  {
    throw new Error("It is not a strong password");
  }
}

let validateEditProfileData = (body) =>{
  const allowedEditFields = ["firstName","lastName","age","gender"];
  return Object.keys(body).every((field)=>allowedEditFields.includes(field));
}

module.exports = {Validate,validateEditProfileData};