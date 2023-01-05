import { map, Subject, Subscription } from "rxjs";
import { scan } from "rxjs";
import { SocketRoom } from "../socket/socket-room";
import { PlayerConnectionInfo } from "../types/player-connection-info";

export abstract class GameEngine {
    
    private subscription?: Subscription;
    protected playerActionSubject?: Subject<any>;
    protected playersConnectionInfo: any[];
    protected socketRoom: SocketRoom;

    abstract getAccoumulator(): any;
    abstract getStateChangedPlayerCallbackFilter(): (state: any, playerId: number) => object;
    abstract getInitialGameState(): any;

    constructor(playersConnectionInfo: any[], socketRoom: SocketRoom){
        this.playersConnectionInfo = playersConnectionInfo;
        this.socketRoom = socketRoom;
        playersConnectionInfo.forEach((playerConnectionInfo: PlayerConnectionInfo) => {
            const playerSocket = playerConnectionInfo.socket;
            playerSocket.on("move", (playerMove: any) => {
                playerMove.playerId = playerSocket.playerId;
                this.playerActionSubject?.next(playerMove);
            })
        })
    }

    startEngine(): GameEngine {
        const playerState = this.getInitialGameState();
        const accoumulator = this.getAccoumulator();
        const changedStateHandler = this.getStateChangedPlayerCallbackFilter();

        this.playerActionSubject = new Subject();
        
        this.subscription = this.playerActionSubject!.pipe(
            scan(accoumulator, playerState)
        ).subscribe((state: any) => {
            this.playersConnectionInfo.forEach((pci => {
                const result = changedStateHandler(state, pci.playerId);
                pci.socket.emit("statechange", result);
            }))
        });
        
        return this;
    }

    stop(){
        this.subscription!.unsubscribe();
    }

}