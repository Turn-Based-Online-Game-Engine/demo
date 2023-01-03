import { roomCreatedSubject } from '../gameengine/flowcontroller';
import * as roomRepository from '../repositories/room'


const getRooms = () => {
    return roomRepository.getRooms();
}

const getRoom = (roomId: number) => {
    return roomRepository.getRoom(roomId);
}

const postRooms = (roomInfo: any) => {
    const newRoom = roomRepository.saveRoom(roomInfo);
    roomCreatedSubject.next(roomInfo);
    return newRoom;
}


export {getRoom, getRooms, postRooms}