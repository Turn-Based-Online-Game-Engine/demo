import { Application } from "express";
import { Server } from "http";
import { FlowController } from "./gameengine/flowcontroller";
import { roomRouter } from "./routes/room";
import { PlayerConnectionListener, WebSocket } from "./socket/socket-room";

const express = require('express');

export const app: Application = express();
app.use(express.json());

// Routes
app.use(roomRouter);

export const server: Server = app.listen(3000, () => {
    console.log("Expresse running on port 3000")
})

export const io = WebSocket.getInstance(server);
const playerConnectionListener = new PlayerConnectionListener(io);
const flowController = new FlowController();