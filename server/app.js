// Imports
const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const bodyParser = require("body-parser");

// Environment variables
const environmentConstants = require("../env-constants.json");
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || environmentConstants.DEV_PORT;

const io = new Server(server, {
  cors: {
    origin: `http://localhost:${
      ENV == "dev" ? environmentConstants.CLIENT_PORT : PORT
    }`,
    methods: ["GET", "POST"],
  },
});

let games = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (ENV == "prod") {
  app.use(express.static(path.resolve(__dirname, "../client/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
  });
}

setInterval(() => {
  io.emit("update-games", games);
}, 300);

io.on("connection", (socket) => {
  console.log("A user connected");
  // console.log(socket);
  socket.on("disconnect", (_) => {
    console.log(`User with id: ${socket.id} disconnected`);
    let updatedGameID;
    for (const gameID in games) {
      if (games[gameID].players.includes(socket.id)) {
        updatedGameID = gameID;
        games[gameID].players = games[gameID].players.filter(
          (player) => player.id != socket.id
        );
      }
    }
    if (updatedGameID)
      io.to(updatedGameID).emit("update-game", games[updatedGameID]);
  });

  socket.on("join-game", ({ userID, gameID, game }) => {
    if (games[gameID]) {
      if (games[gameID].players.length == 4) {
        socket.broadcast.emit("game-full");
      } else {
        socket.join(gameID);
        games[gameID].players.push(userID);
        games[gameID].id = gameID;
        io.to(gameID).emit("game-joined", games[gameID]);
        if (games[gameID].players.length == 4) {
          io.to(gameID).emit("game-start");
        }
      }
    } else {
      console.log("New game");
      games[gameID] = game;
      games[gameID].id = gameID;
      socket.join(gameID);
      io.to(gameID).emit("game-joined", games[gameID]);
    }
  });

  socket.on("send-image-data", ({ gameID, image }) => {
    if (!games[gameID].images) games[gameID].images = [];
    games[gameID].images.push(image);

    if (games[gameID].images.length == 4) {
      io.to(gameID).emit("receive-image-data", games[gameID].images);
      delete games[gameID];
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
