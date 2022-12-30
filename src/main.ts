import { interval, Observable, reduce, scan, Subject } from "rxjs";
import { Subscriber } from "../node_modules/rxjs/dist/types/index";
import * as readline from "readline-sync";

const gameState = {
    board: [['', '', ''], ['', '', ''], ['', '', '']],
    players: ['player1', 'player2'],
    playerSigns: {
        "player1": "X",
        "player2": "O"
    },
    turn: 'player1'
}

const printOutState = (state: any) => {
    console.log("Game state so far:")
    console.log("Board =>")
    state.board.forEach((x: any) => console.log(x));
    console.log(`Player's turn: ${state.turn}`)
    console.log()
}

class PlayerMove {
    public x: number
    public y: number

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}


const observable: Observable<PlayerMove> = new Observable((subscriber: any) => {
    while (true){
        const answer = readline.question("What's your move ? ");
        let rawMove = answer.split(' ')
        let playerMove = new PlayerMove(parseInt(rawMove[0]), parseInt(rawMove[1]))
        subscriber.next(playerMove);
    }

});

printOutState(gameState);

observable.pipe(
    scan((state: any, move: PlayerMove): any => {
        let playerMove = (move as PlayerMove);
        let playerId = state.turn;
        let playerSign = state.playerSigns[playerId]
        state.board[playerMove.x][playerMove.y] = playerSign
        
        let playerIndex: number = state.players.indexOf(playerId);
        
        let nextPlayerIndex = (playerIndex + 1) % state.players.length;
        state.turn = state.players[nextPlayerIndex];
        
        return state;
    }, gameState)
).subscribe(((result: any) => {
    printOutState(result);
}));

