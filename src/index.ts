import { Application } from "express";
import { Server} from "socket.io";
import { roomRouter } from "./routes/room";
const http = require('http');
const express = require('express');

export const app: Application = express();
const httpServer = http.createServer(app);
export const io = new Server(httpServer);

httpServer.listen(3000, () => {console.log('listening on *:3000');});

app.use(express.json());

// Routes
app.use(roomRouter);


app.listen(8080, () => {
    console.log("Expresse running on port 3000")
})

