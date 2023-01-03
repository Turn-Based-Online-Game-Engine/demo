import { v4 as uuidv4 } from 'uuid';
const rooms: any = [];

const getRooms = () => {
    return rooms;
}

const getRoom = (roomId: number) => {
    return rooms[roomId];
}

const saveRoom = (roomInfo: any) => {
    const roomId: number = rooms.length + 1;
    const playersCount: number = roomInfo.playersCount;
    
    const newRoom =  {
        roomId: roomId,
        roomKey: uuidv4(),
        playersCount: playersCount
    };

    rooms.push(newRoom);
    return newRoom;
}


export {getRooms, getRoom, saveRoom}