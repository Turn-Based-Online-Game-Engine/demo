const http = require('http');
import { bufferCount, Subject } from "rxjs";
import { Server, Socket } from "socket.io";


const playerJoinedSubject = new Subject<PlayerJoinedInfo>();
const playerDisconectedSubject = new Subject<PlayerJoinedInfo>();


class PlayerJoinedInfo {

    public playerId: string;
    public socket: Socket;
    public roomId: number;

    constructor(playerId: string, socket: Socket, roomId: number) {
        this.playerId = playerId;
        this.socket = socket;
        this.roomId = roomId;
    }
}

export class LiveCommunicator {

    app: any;
    httpServer: any;
    io: any;

    constructor(app: any){
        this.app = app;
        this.httpServer = http.createServer(this.app);
        this.io = new Server(this.httpServer);

        // Middlewares

        // Auth
        this.io.use((_socket: any, next: any)=> {
            // TODO auth with socket.handshake.headers.auth
            console.log("Authentication passed");
            next();
        });

        // Validation
        this.io.use((socket: any, next: any)=> {
            console.log("Validating user");
            if (socket.handshake.headers.user)
                next();
            else
                next(new Error("Invalid user"))
        });

        this.io.on("connection", (socket: any) => {
            console.log('a user connected');
            
            const playerId: string = socket.handshake.headers.user;
            const roomId: number = socket.handshake.headers.roomId;
            const playerJoinedInfo: PlayerJoinedInfo = new PlayerJoinedInfo(playerId, socket, roomId);
            
            playerJoinedSubject.next(playerJoinedInfo);
            
            socket.on('disconnect', () => {
                playerDisconectedSubject.next(playerJoinedInfo);
                console.log('user disconnected');
            });
        });

        this.httpServer.listen(3000, () => {
            console.log('listening on *:3000');
        });

    }
    
}

