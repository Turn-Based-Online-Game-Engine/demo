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

printOutState(gameState);

class PlayerMove {
    public x: number
    public y: number

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}


const observable = new Observable((subscriber: any) => {
    while (true){
        const answer = readline.question("What's your move ? ");
        let rawMove = answer.split(' ')
        let playerMove = new PlayerMove(parseInt(rawMove[0]), parseInt(rawMove[1]))
        subscriber.next(playerMove);
    }

});


observable.pipe(
    scan((data: any, value: any): any => {
        let playerMove = (value as PlayerMove);
        let playerId = data.turn;
        let playerSign = data.playerSigns[playerId]
        data.board[playerMove.x][playerMove.y] = playerSign
        
        let playerIndex: number = data.players.indexOf(playerId);
        
        let nextPlayerIndex = (playerIndex + 1) % data.players.length;
        data.turn = data.players[nextPlayerIndex];
        
        return data;
    }, gameState)
).subscribe(((result: any) => {
    printOutState(result);
}));

