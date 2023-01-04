import { Subject, Subscription } from "rxjs";
import { scan } from "rxjs";


export abstract class GameEngine {
    
    subscription?: Subscription;
    protected playerActionSubject?: Subject<any>;

    abstract getAccoumulator(): any;
    abstract getChangedStateHandler(): any;
    abstract getInitialGameState(): any;

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