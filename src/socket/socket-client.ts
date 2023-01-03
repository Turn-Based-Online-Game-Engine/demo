const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.io.on("error", (error:any) => {
  console.log(error)
});

socket.on('message', (data:any) => {
    console.log(data)
});
  
  
socket.emit('createRoom');
