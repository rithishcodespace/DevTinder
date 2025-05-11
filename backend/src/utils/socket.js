const socket = require("socket.io");
const crypto = require("crypto");

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

        socket.on("sendMessage",({firstName,userId,targetUserId,text}) => { // recieives the message from frontend
           const room_id = createRoom_id(userId,targetUserId)
           console.log(firstName + " : " + text);
           io.to(room_id).emit("messageReceived",{firstName,text}) //sending the message to the room
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