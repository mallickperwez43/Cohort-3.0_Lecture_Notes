import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

// event handler
wss.on('connection', (ws) => {
    console.log("User has connected");
    ws.send("Hello user & welcome");

    setInterval(() => {
        ws.send(`Current price of Solana is : ${Math.random()}`);
    }, 1000);

    ws.on('message', (msg) => {
        console.log(`Message from the user is : ${msg}`);
    });

    ws.on('close', () => {
        console.log("User disconnected");
    });
});

