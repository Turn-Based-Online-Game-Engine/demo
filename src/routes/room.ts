import { getRoom, getRooms, postRooms } from "../controllers/room";

const express = require('express');
export const roomRouter = express.Router();

roomRouter.route("/rooms").post(postRooms).get(getRooms);
roomRouter.route("/rooms/:roomId").get(getRoom);
