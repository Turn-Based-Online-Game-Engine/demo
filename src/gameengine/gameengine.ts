import { Subject, Subscription } from "rxjs";
import { scan } from "rxjs";
import { SocketRoom } from "../socket/socket-room";

export abstract class GameEngine {
    
    private subscription?: Subscription;
    protected playerActionSubject?: Subject<any>;
    protected playersConnectionInfo: any[];
    protected socketRoom: SocketRoom;

    abstract getAccoumulator(): any;
    abstract getChangedStateHandler(): any;
    abstract getInitialGameState(): any;

    constructor(playersConnectionInfo: any[], socketRoom: SocketRoom){
        this.playersConnectionInfo = playersConnectionInfo;
        this.socketRoom = socketRoom;
    }

    startEngine(): GameEngine {
        const playerState = this.getInitialGameState();
        const accoumulator = this.getAccoumulator();
        const changedStateHandler = this.getChangedStateHandler();

        this.playerActionSubject = new Subject();
        
        this.subscription = this.playerActionSubject!.pipe(
            scan(accoumulator, playerState)
        ).subscribe(changedStateHandler);
        
        return this;
    }

    stop(){
        this.subscription!.unsubscribe();
    }

}