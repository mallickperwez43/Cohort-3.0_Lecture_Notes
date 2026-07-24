import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// event handler
wss.on('connection', (ws) => {
    console.log("User connected");

    ws.on('message', (data) => {
        const message = data.toString();
        if (message.toLowerCase() === 'ping') {
            ws.send("Pong");
        } else {
            ws.send("I only respond to 'ping'!");
        }
    });

    ws.on('close', () => console.log("User left"));
});
