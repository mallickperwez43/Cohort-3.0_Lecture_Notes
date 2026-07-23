import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// event handler
wss.on('connection', (ws) => {
    console.log("WS server is active");

    ws.on('message', (msg) => {
        if (msg.toString().toLowerCase() === 'ping')
            ws.send('pong')
    })
});