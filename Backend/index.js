const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
var cors = require('cors')
const {connection}=require('./config/db')
const {userRouter}=require("./routes/user.route")
const {channelRouter}=require("./routes/channel.route")
const {userModel,channelModel}=require("./models/models")


const app = express();
app.use(express.json())
app.use(cors())
app.use("/",userRouter)
app.use("/",channelRouter)

const server = http.createServer(app);
const io = socketIO(server);


// Socket.IO setup
const activeUsers = new Map();

io.on('connection', (socket) => {

  socket.on('joinChannel', async ({ channelId, username }) => {
    socket.join(channelId);
    activeUsers.set(socket.id, { channelId, username });

    io.to(channelId).emit('userJoined', username);
  });

  socket.on('sendMessage', ({ channelId, username, message }) => {
    io.to(channelId).emit('message', { username, message });
  });

  socket.on('addMemberToChannel', async ({ channelId, username,userId}) => {
    try {
      const channel = await channelModel.findOne({ _id: channelId, users: { $ne: userId } });
      if (channel) {
        channel.users.push(userId);
        await channel.save();
        // Emit a success event to the client
        socket.emit('addMemberSuccess', { channelId, username, message: 'Member added successfully' });
      } else {
        // Emit an error event to the client
        socket.emit('addMemberError', { error: 'Channel not found or member already exists' });
      }
    } catch (error) {
      // Handle the error
      console.error('Error adding member to channel:', error);
      // Emit an error event to the client
      socket.emit('addMemberError', { error: 'An error occurred while adding a member to the channel' });
    }
  });

  socket.on('disconnect', () => {
    if (activeUsers.has(socket.username)) {
      const { channelId, username } = activeUsers.get(socket.username);
      activeUsers.delete(socket.username);
      io.to(channelId).emit('userLeft', username);
    }
    console.log(`A ${socket.username|| 'user'} disconnected.`);
  });

  socket.on("error",(error)=>{
    console.log(error)
  })
});


// Start the server
const port = 3000;
server.listen(port, async() => {
    try {
        await connection 
        console.log("Connected to the DB")
    } catch (error) {
        console.log(error.message)
    }
  console.log(`Server is running on port ${port}`);
});
