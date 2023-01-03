import { Application } from "express";
import { roomRouter } from "./routes/room";
import { LiveCommunicator } from "./socket";

const express = require('express');

export const app: Application = express();
const liveCommunicator = new LiveCommunicator(app);

// Routes
app.use(roomRouter);


app.listen(8080, () => {
    console.log("Expresse running on port 3000")
})

