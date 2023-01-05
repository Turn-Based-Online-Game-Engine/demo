import {Subject} from "rxjs";
import {PlayerConnectionInfo} from "../types/player-connection-info";

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

    public playerJoined(playerConnectionInfo: PlayerConnectionInfo) {
        this.playerJoinedSubject.next(playerConnectionInfo);
    }

}
