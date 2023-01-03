import { Application } from "express";
import { roomRouter } from "./routes/room";
import { createSocketConnection } from "./socket/socket-room";

const express = require('express');

export const app: Application = express();

// Routes
app.use(roomRouter);

export const server =app.listen(3000, () => {
    console.log("Expresse running on port 3000")
})

createSocketConnection(server)