require('dotenv').config();
console.log(process.env.MONGO_URI); 
const mongoose = require("mongoose");

const connectDB = async () =>{
   await mongoose.connect("mongodb+srv://rithishcodespace:Rithish%402006@rithish.cvr15.mongodb.net/?retryWrites=true&w=majority&appName=Rithish");
}

module.exports = connectDB;
