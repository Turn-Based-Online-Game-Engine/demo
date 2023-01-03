import { bufferCount, distinct, Subject } from "rxjs";
import { roomCreatedSubject } from "./pipelines";

const flowPipelines: any = {};
const games: any = {};
const socketRooms: any = {};



roomCreatedSubject.subscribe((gameInfo: any)=>{
    const playerConnectedSubject = new Subject();
    const playersCount = gameInfo.playersCount;
    const roomId = gameInfo.roomId;

    const subscription = playerConnectedSubject.pipe(
        distinct((connectionInfo:any) => connectionInfo.roomId),
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
    throw new Error("Function not implemented.");
}

const createSocketRoom = (gameInfo: any, x:any) => {
    throw new Error("Function not implemented.");
}

