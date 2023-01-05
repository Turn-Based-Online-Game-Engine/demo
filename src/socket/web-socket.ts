export class CustomWebSocket {

    private static io: any;

    // todo make Singleton
    public static getInstance(httpServer: any): WebSocket {
        if (!CustomWebSocket.io) {
            CustomWebSocket.io = io(httpServer);
        }
        return CustomWebSocket.io;
    }

}
