const io = require('socket.io');
const socketRooms: any = {};

export const createSocketConnection = (server:any) => {
    
    const socketIo = io(server);
    
    let rooms = 0;

    socketIo.on('connection', (socket:any) => {
      
      // const roomId = socket.handshake.headers.roomId;
      
      // if (!(roomId in socketRooms)){
      //   throw new Error("Invalid roomId")
      // }
          
        console.log('A user has connected');
        
        socket.on('createRoom', () => {
          console.log('Creating a new room');
          socket.join(`room-${++rooms}`);
          socket.emit('newRoom', { room: `room-${rooms}` });
        });
        
        socket.on('joinRoom', (data:any) => {
          console.log(`Joining room ${data}`);
          const roomId = data.room
          const playerId:string = (socket.handshake.headers.playerId as string);

          socket.join(data.room);
          socket.to(data.room).emit('userJoined', { room: data.room });
          
          const socketRoom = socketRooms[roomId];
          socketRoom.playerJoined(playerId, socket);

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


export class SocketRoom {

    private gameInfo: any;
    private playerConnectedSubject: any;

    constructor(gameInfo: any, playerConnectedSubject: any) {
        this.gameInfo = gameInfo;
        this.playerConnectedSubject = playerConnectedSubject;
    }

    public playerJoined(playerId: string, socket: any){
        this.playerConnectedSubject.next({
            playerId: playerId,
            socket: socket,
            roomId: this.gameInfo.roomId
        });
    }

}
