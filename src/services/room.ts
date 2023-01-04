import { roomCreatedSubject } from '../gameengine/pipelines';
import * as roomRepository from '../repositories/room'


const getRooms = () => {
    return roomRepository.getRooms();
}

const getRoom = (roomId: number) => {
    return roomRepository.getRoom(roomId);
}

const postRooms = (roomInfo: any) => {
    const newRoom = roomRepository.saveRoom(roomInfo);
    console.log("Sending new room event", roomInfo);
    roomCreatedSubject.next(newRoom);
    return newRoom;
}


export {getRoom, getRooms, postRooms}