const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/chat")

const createRoom_id = (userId,targetUserId) => {
  return crypto
  .createHash("sha256")
  .update([userId,targetUserId].sort().join("_"))
  .digest("hex");
}

const initializeSocket = (server) => {
    try{
      const io = socket(server,{
        cors:{
          origin:"http://localhost:5173",
        },
      })
      io.on("connection",(socket) => { // listening to connections
        // handle request

        socket.on("joinChat",({userId,targetUserId}) => { //based on the room_id creation the numbers users connected to a room can be modified
          // creates a individual connectin between the two users (like a room for them)
          const room_id = createRoom_id(userId,targetUserId); //unique room_id for the logged_in person
          socket.join(room_id) // if both person joins same room id they will be connected
          console.log("created room: "+[userId,targetUserId].sort().join("_"));
        })

        socket.on("sendMessage",async ({firstName,userId,targetUserId,text}) => { // recieives the message from frontend
           const room_id = createRoom_id(userId,targetUserId)
           console.log(firstName + " : " + text);

           // saves the message to the db
           try{
             const chat = await Chat.findOne({
              participants: {$all: [userId,targetUserId]},
             })

             if(!chat){ // if this is the first time they are chating creates new chat model  
              chat = new Chat({
                participants: [userId,targetUserId],
                message: [],
              })
             }

             chat.messages.push({
               senderId : userId,
               text
             })
             await chat.save();
           }
           catch(error)
           {
               
           }
           //sending the message to the room
           io.to(room_id).emit("messageReceived",{firstName,text}) 
        })

        socket.on("disconnect",() => {
            
        })

      })
    }
    catch(error)
    {
      console.log("ERROR:",error);
    }
}

module.exports = initializeSocket;