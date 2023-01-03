import { v4 as uuidv4 } from 'uuid';

const rooms: any = [];
const roomFlowPipepline: any = {};


const getRooms = () => {
    return rooms;
}

const getRoom = (roomId: number) => {
    return rooms[roomId];
}

const postRooms = (roomInfo: any) => {
    const roomId: number = rooms.length + 1;
    const playersCount: number = roomInfo.playersCount;
    
    const newRoom =  {
        roomId: roomId,
        roomKey: uuidv4(),
        playersCount: playersCount
    };

    rooms.push(newRoom);
    return newRoom;
    // const playerJoinedSubject = new Subject<any>();

    // const subscription = playerJoinedSubject.pipe(
    //     bufferCount(playersCount)    
    // ).subscribe((joinedPlayersInfo: any)=>{
    //     startGame(joinedPlayersInfo)
    // });

    // roomFlowPipepline[roomId] = {
    //     joinedSubject: playerJoinedSubject,
    //     subscription: subscription
    // }

    // res.json(newRoom)
}


export {getRoom, getRooms, postRooms}