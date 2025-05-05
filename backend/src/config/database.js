require('dotenv').config();
console.log(process.env.MONGO_URI); 
const mongoose = require("mongoose");

const connectDB = async () =>{
   await mongoose.connect(process.env.MONGO_URI);
}

module.exports = connectDB;
