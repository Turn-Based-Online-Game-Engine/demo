import { runInThisContext } from "vm";
import { SocketRoom } from "../socket/socket-room";
import { PlayerConnectionInfo } from "../types/player-connection-info";
import { GameEngine } from "./gameengine";
import { playerConnectedSubject } from "./pipelines";

class PlayerMove {
    
    public amount: number;
    public playerId: number;

    constructor(amount: number, playerId: number) {
        this.amount = amount;
        this.playerId = playerId;
    }

}


export class WhoGotHigher extends GameEngine {
    

    constructor(playersConnectionInfo: any[], socketRoom: SocketRoom){
        super(playersConnectionInfo, socketRoom);
        playersConnectionInfo.forEach((playerConnectionInfo: PlayerConnectionInfo) => {
            const playerSocket = playerConnectionInfo.socket;
            playerSocket.on("move", (playerMove: PlayerMove) => {
                playerMove.playerId = playerSocket.playerId;
                this.playerActionSubject?.next(playerMove);
            })
        })
    }
    
    getAccoumulator() {
        return (state: any, playerAction: PlayerMove): any => {
            console.log("Player moveeed", playerAction);
            state.playerNumbers[state.playerTurn] = playerAction.amount;

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
