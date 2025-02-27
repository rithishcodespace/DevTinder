const express = require("express");
let connectDB = require("./config/database");
let cookieParser = require("cookie-parser");
let authRoute = require("./routes/auth");
let profileRoute = require("./routes/profile");
let requestRoute = require("./routes/request");

const app = express();
app.use(cookieParser());
app.use(express.json());

//checks for matching routes
app.use("/",authRoute);
app.use("/",profileRoute);
app.use("/",requestRoute);

connectDB().then(()=>{
    console.log("Db connected successfully!");
    app.listen(3000,()=>console.log("port successfully running on port 3000"));
}).catch((error)=>{
    console.log("Error occured in db connection"+error.message);
})

