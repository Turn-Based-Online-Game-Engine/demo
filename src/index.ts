import { Application } from "express";
import { Server } from "http";
import { FlowController } from "./gameengine/flowcontroller";
import { roomRouter } from "./routes/room";
import {PlayerConnectionListener} from "./socket/player-connection-listener";
import {CustomWebSocket} from "./socket/web-socket";

const express = require('express');

export const app: Application = express();
app.use(express.json());

app.use(roomRouter);

export const server: Server = app.listen(3000, () => {
    console.log("running on port 3000")
})

export const io = CustomWebSocket.getInstance(server);
const playerConnectionListener = new PlayerConnectionListener(io);
const flowController = new FlowController();
