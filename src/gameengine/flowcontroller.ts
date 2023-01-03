import { bufferCount, distinct, Subject } from "rxjs";
import { SocketRoom } from "../socket";
import { WhoGotHigher } from "./main";


export const roomCreatedSubject = new Subject();
export const playerConnected = new Subject();

const flowPipelines: any = {};
const games: any = {};
const socketRooms: any = {};




roomCreatedSubject.subscribe((gameInfo: any)=>{
    const playerConnectedSubject = new Subject();
    const playersCount = gameInfo.playersCount;
    const roomId = gameInfo.roomId;

    const subscription = playerConnectedSubject.pipe(
        bufferCount(playersCount)
    ).subscribe((playersConnectionInfo ) => {
       const game = startGame(playersConnectionInfo); 
       games[roomId] = game; 
       subscription.unsubscribe();
    });
    const socketRoom = createSocketRoom(gameInfo, playerConnectedSubject)
    socketRooms[roomId] = socketRoom;
    flowPipelines[roomId] = playerConnectedSubject;
})


function startGame(playersConnectionInfo: any[]) {
    const game = new WhoGotHigher(playersConnectionInfo)
    return game;
}

const createSocketRoom = (gameInfo: any, playerConnectedSubject:any) => {
    const socketRoom = new SocketRoom(gameInfo, playerConnectedSubject);
    return socketRoom;
}

