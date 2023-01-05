import {PlayerConnectionInfo} from "../types/player-connection-info";
import {playerConnectedSubject} from "../gameengine/pipelines";
import { authenticatePlayer } from "./auth";

export class PlayerConnectionListener {

    private io: any;

    constructor(io: any) {
        this.io = io;
        this.io.use(authenticatePlayer)
        this.io.on('connection', (socket: any) => {
            const roomId = socket.handshake.headers.roomid;
            const playerId = socket.handshake.headers.playerid;

            const playerConnectionInfo: PlayerConnectionInfo = {
                socket: socket,
                roomId: roomId,
                playerId: playerId

            };
            console.log("Player connected", playerConnectionInfo.roomId, playerConnectionInfo.playerId);

            playerConnectedSubject.next(playerConnectionInfo);
        })
    }

}
