import { Server } from "socket.io";

export class CustomWebSocket {

    private static io: any;

    // todo make Singleton
    public static getInstance(httpServer: any): WebSocket {
        if (!CustomWebSocket.io) {
            CustomWebSocket.io = new Server(httpServer);
        }
        return CustomWebSocket.io;
    }

}
