import { io } from "./index";


const socketRooms: any = {};

io.use((socket: any, next: any)=>{
    const roomId = socket.handshake.headers.roomId;
    if (!(roomId in socketRooms))
        next(new Error("Invalid roomId"))
    next();
});

io.on("connection", (socket) => {
    const roomId:string = (socket.handshake.headers.roomId as string);
    const playerId:string = (socket.handshake.headers.playerId as string);
    const socketRoom = socketRooms[roomId];
    socketRoom.playerJoined(playerId, socket);
});

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
