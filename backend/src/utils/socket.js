const socket = require("socket.io");

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
          const room_id = [userId,targetUserId].sort().join("_"); //unique room_id for the logged_in person
          socket.join(room) // if both person joins same room id they will be connected
        })

        socket.on("sendMessage",({firstName,userId,targetUserId,text}) => { // recieives the message from frontend
           const room_id = [userId,targetUserId].sort().join("_");
           i0.to(room_id)
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