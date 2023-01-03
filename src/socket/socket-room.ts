const io = require('socket.io');

export const createSocketConnection = (server:any) => {
    
    const socketIo = io(server);
    
    let rooms = 0;

    socketIo.on('connection', (socket:any) => {
    
        console.log('A user has connected');
        
        socket.on('createRoom', () => {
          console.log('Creating a new room');
          socket.join(`room-${++rooms}`);
          socket.emit('newRoom', { room: `room-${rooms}` });
        });
        
        socket.on('joinRoom', (data:any) => {
          console.log(`Joining room ${data.room}`);
          socket.join(data.room);
          socket.to(data.room).emit('userJoined', { room: data.room });
        });
        
        socket.on('sendMessage', (data:any) => {
          console.log(`Sending message to room ${data.room}: ${data.message}`);
          socket.to(data.room).emit('message', { username: data.username, message: data.message });
        });
        
        socket.on('disconnect', () => {
          console.log('A user has disconnected');
        });
    
    });

}



