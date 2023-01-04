import { Server } from "http";
import { Subject } from "rxjs";
import { playerConnectedSubject } from "../gameengine/pipelines";
const io = require('socket.io');
const socketRooms: any = {};


export class WebSocket {

    private static io: any;

    // Singletone
    public static getInstance(httpServer: any): WebSocket {
        if (!WebSocket.io) {
            WebSocket.io = io(httpServer);
        }
        return WebSocket.io;
    }

}


export class PlayerConnectionInfo {
    
    public socket: any;
    public roomId: string;
    public playerId: string;

    constructor(socket: any, roomId: string, playerId: string){
        this.socket = socket;
        this.roomId = roomId;
        this.playerId = playerId;
    }
}

export class PlayerConnectionListener {

    private io: any;

    constructor(io: any){
        this.io = io;
        this.io.on('connection', (socket: any) => {
            const playerId = socket.handshake.headers.playerid;
            const roomId = socket.handshake.headers.roomid;
            const playerConnectionInfo = new PlayerConnectionInfo(socket, roomId, playerId);
            console.log("Player connected", playerConnectionInfo.roomId, playerConnectionInfo.playerId);
            playerConnectedSubject.next(playerConnectionInfo);
        })
    }

}

export class SocketRoom {

    private gameInfo: any;
    public playerJoinedSubject: any;
    public allPlayersJoinedSubject: any;

    constructor(gameInfo: any) {
        console.log("Creating socket room");
        this.gameInfo = gameInfo;
        this.playerJoinedSubject = new Subject();
        this.allPlayersJoinedSubject = new Subject();
    }

    public playerJoined(playerId: string, socket: any){  
        this.playerJoinedSubject.next({
            playerId: playerId,
            socket: socket,
            roomId: this.gameInfo.roomId
        });
    }

}
