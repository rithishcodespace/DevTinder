require("dotenv").config();
const express = require("express");
let connectDB = require("./config/database");
let cookieParser = require("cookie-parser");
const cors = require("cors");
let authRoute = require("./routes/auth");
let profileRoute = require("./routes/profile");
let requestRoute = require("./routes/request");
let userRoute = require("./routes/user");
let paymentRoute = require("./routes/payment");
const cron = require("./utils/Cron") // imported globally so the file will start execute
const http = require("http"); // socket.io
const initializeSocket = require("./utils/socket");

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
app.use("/",paymentRoute);

const server = http.createServer(app) // socket.io -> app is instance of express
initializeSocket(server) // socket.io -> see in utils

connectDB().then(()=>{ // app -> sever for socket.io
    console.log("Db connected successfully!");
    server.listen(3000,()=>console.log("port successfully running on port 3000"));
}).catch((error)=>{
    console.log("Error occured in db connection"+error.message);
})

