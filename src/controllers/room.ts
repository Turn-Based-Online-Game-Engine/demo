import { Request, Response } from "express"
import * as roomService from '../services/room';


export const getRooms = (req: Request, res: Response) => {
    const rooms = roomService.getRooms()
    res.json(rooms)
}

export const getRoom = (req: Request, res: Response) => {
    const roomId: number = (req.params.roomId as unknown as number);
    const room = roomService.getRoom(roomId);
    res.json(room);
}

export const postRooms = (req: Request, res: Response) => {
    const playersCount: number = req.body.playersCount;
    const newRoom = roomService.postRooms({playersCount: playersCount});
    res.json(newRoom)
}