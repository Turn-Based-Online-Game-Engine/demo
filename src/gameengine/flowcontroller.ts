import {bufferCount, take} from "rxjs";
import {SocketRoom} from "../socket/socket-room";
import {WhoGotHigher} from "./main";
import {playerConnectedSubject, roomCreatedSubject} from "./pipelines";
import {PlayerConnectionInfo} from "../types/player-connection-info";


export class FlowController {

    private games: any = {};
    private socketRooms: any = {};

    constructor() {
        playerConnectedSubject.subscribe((playerConnectionInfo: PlayerConnectionInfo) => {
            const socketRoom = this.socketRooms[playerConnectionInfo.roomId];
            socketRoom.playerJoined(playerConnectionInfo);
        })

        roomCreatedSubject.subscribe((gameInfo: any) => {
            const roomId = gameInfo.roomId;
            const socketRoom = new SocketRoom(gameInfo);
            this.socketRooms[roomId] = socketRoom;
            const playersCount = gameInfo.playersCount;

            socketRoom.playerJoinedSubject.pipe(
                bufferCount(playersCount),
                take(1) // <3
            ).subscribe((playerConnectionsInfo: any) => {
                socketRoom.allPlayersJoinedSubject.next(playerConnectionsInfo);
            });

            socketRoom.allPlayersJoinedSubject.subscribe((playersConnectionInfo: any) => {
                const game = new WhoGotHigher(playersConnectionInfo, socketRoom).startEngine();
                console.log("Game started", game);
                this.games[roomId] = game;
            })

        });
    }

}
