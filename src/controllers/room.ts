import { Request, Response } from "express"
import { v4 as uuidv4 } from 'uuid';

const rooms: any = [];

export const getRooms = (req: Request, res: Response) => {
    res.json(rooms)
}

export const getRoom = (req: Request, res: Response) => {
    const roomId = req.params.roomId;
    res.json(rooms[roomId]);
}


export const postRooms = (req: Request, res: Response) => {
    const newRoom =  {
        roomId: rooms.length + 1,
        roomKey: uuidv4()
    };
    rooms.push(newRoom);
    res.json(newRoom)
}