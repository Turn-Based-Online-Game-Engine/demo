const http = require('http');
import { Server } from "socket.io";


export class LiveCommunicator {

    app: any;
    httpServer: any;
    io: any;

    constructor(app: any){
        this.app = app;
        this.httpServer = http.createServer(this.app);
        this.io = new Server(this.httpServer);

        // Middlewares

        // Auth
        this.io.use((_socket: any, next: any)=> {
            // TODO auth with socket.handshake.headers.auth
            console.log("Authentication passed");
            next();
        });

        // Validation
        this.io.use((socket: any, next: any)=> {
            console.log("Validating user");
            if (socket.handshake.headers.user)
                next();
            else
                next(new Error("Invalid user"))
        });

        this.io.on("connection", (socket: any) => {
            console.log('a user connected');
            
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });

            socket.on('chat message', (msg: string) => {
                console.log('message: ' + msg);
                socket.emit("helo");
            });
        });

        this.httpServer.listen(3000, () => {
            console.log('listening on *:3000');
        });

    }
    
}

