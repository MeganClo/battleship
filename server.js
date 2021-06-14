const express = require("express");
const path = require("path");
const http = require("http");
const PORT = process.env.PORT || 3008;
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// start server
server.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));

// handle a socket connection request from socket client
// only keep track of two connections
const connections = [null, null]

io.on("connection", socket => {
    console.log("new web socket connection!");
    // find available player nunber
    let playerIndex = -1;
    for (const i in connections) {
        if (connections[i] === null) {
            playerIndex = i;
            break;
        }
    }

    // tell the connecting client what player number they are:
    // "player number" is the title, playerIndex is data of message
    socket.emit("Player number", playerIndex);

    console.log(`Player ${playerIndex} has connected`);

    // ignore player 3
    if (playerIndex === -1) return;


});