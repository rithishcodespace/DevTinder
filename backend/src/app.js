require("dotenv").config();
const express = require("express");
let connectDB = require("./config/database");
let cookieParser = require("cookie-parser");
const cors = require("cors");
let authRoute = require("./routes/auth");
let profileRoute = require("./routes/profile");
let requestRoute = require("./routes/request");
let userRoute = require("./routes/user");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:5173", // your frontend URL
      credentials: true, //this allows to receive the cookie from frontend
    })
  );

//checks for matching routes
app.use("/",authRoute);
app.use("/",profileRoute);
app.use("/",requestRoute);
app.use("/",userRoute);

connectDB().then(()=>{
    console.log("Db connected successfully!");
    app.listen(3000,()=>console.log("port successfully running on port 3000"));
}).catch((error)=>{
    console.log("Error occured in db connection"+error.message);
})

