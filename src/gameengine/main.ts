import { SocketRoom } from "../socket/socket-room";
import { GameEngine } from "./gameengine";



export class WhoGotHigher extends GameEngine {
    

    constructor(playersConnectionInfo: any[], socketRoom: SocketRoom){
        super(playersConnectionInfo, socketRoom);
        console.log("Starting the game WhoGotHigher!!!", this.playersConnectionInfo);
    }
    
    getAccoumulator() {
        return (state: any, playerAction: any): any => {
            state.playerNumbers[state.playerTurn] = playerAction;

            if (state.playerTurn == 'pl2') {
                const pl1Move = state.playerNumbers['pl1'];    
                const pl2Move = state.playerNumbers['pl2'];    
                if ((pl1Move as number) > (pl2Move as number)){
                    state.scores['pl1'] += 1;
                } else {
                    state.scores['pl2'] += 1;
                }
                state.playerTurn = 'pl1';
            } else {
                state.playerTurn = 'pl2';
            }
            return state;
        }
    }

    getChangedStateHandler() {
        return console.log
    }

    getInitialGameState() {
        return {
            players: ['pl1', 'pl2'],
            playerTurn: 'pl1',
            scores: {
                'pl1': 0,
                'pl2': 0
            },
            playerNumbers: {
                'pl1': undefined,
                'pl2': undefined
            }
        }
    }
    
}
