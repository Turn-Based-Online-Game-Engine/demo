import { table } from "console";
import { bufferCount, take, tap } from "rxjs";
import { PlayerConnectionInfo, SocketRoom } from "../socket/socket-room";
import { WhoGotHigher } from "./main";
import { playerConnectedSubject, roomCreatedSubject } from "./pipelines";


const games: any = {};
const socketRooms: any = {};

playerConnectedSubject.subscribe((playerConnectionInfo: PlayerConnectionInfo) => {
    const socketRoom = socketRooms[playerConnectionInfo.roomId];
    socketRoom.playerJoined(playerConnectionInfo);
})

roomCreatedSubject.subscribe((gameInfo: any) => {
    const roomId = gameInfo.roomId;
    const socketRoom = new SocketRoom(gameInfo);
    socketRooms[roomId] = socketRoom;
    const playersCount = gameInfo.playersCount;

    socketRoom.playerJoinedSubject.pipe(
        bufferCount(playersCount),
        take(1) // <3
    ).subscribe((playerConnectionsInfo: any) => {
        socketRoom.allPlayersJoinedSubject.next(playerConnectionsInfo);
    });

    socketRoom.allPlayersJoinedSubject.subscribe((playersConnectionInfo: any)=>{
        const game = new WhoGotHigher(playersConnectionInfo).startEngine();
        games[roomId] = game;
    })
    
});

export const initializePipelines = undefined;