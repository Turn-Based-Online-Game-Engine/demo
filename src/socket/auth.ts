import { getRoom } from "../repositories/room";

export const authenticatePlayer =  (socket: any, next: any) => {
    try {
        const playerId = socket.handshake.headers.playerid;
        const roomId = socket.handshake.headers.roomid;
        const room = getRoom(roomId);
        socket.room = room;
        socket.player = playerId;
        next();
    } catch(e){
        next(new Error("Authentication failed"));
    }
  };