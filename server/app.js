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
const GameModes = require("../game_modes.json");
const drawingThemes = require("../drawing_themes.json");
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
          (player) => player != socket.id
        );
      }
      if (games[updatedGameID] && games[updatedGameID].players.length == 0) {
        delete games[updatedGameID];
      }
    }
    if (updatedGameID)
      io.to(updatedGameID).emit(
        "update-game",
        games[updatedGameID] || undefined
      );
  });

  socket.on("join-game", ({ userID, gameID, game }) => {
    if (games[gameID]) {
      if (games[gameID].players.length == 4) {
        socket.broadcast.emit("game-full");
      } else if (games[gameID].started) {
        socket.broadcast.emit("game-has-started");
      } else {
        socket.join(gameID);
        games[gameID].players.push(userID);
        games[gameID].id = gameID;
        io.to(gameID).emit("game-joined", games[gameID]);
        if (games[gameID].players.length == 4) {
          io.to(gameID).emit("game-start");
          games[gameID].started = true;
        }
      }
    } else {
      if (game.mode == GameModes.THEME)
        game.theme =
          drawingThemes[Math.floor(Math.random() * drawingThemes.length)];
      games[gameID] = game;
      games[gameID].id = gameID;
      socket.join(gameID);
      io.to(gameID).emit("game-joined", games[gameID]);
    }
  });

  socket.on("send-image-data", ({ gameID, image }) => {
    if (!games[gameID].images) games[gameID].images = [];
    games[gameID].images.push(image);

    if (games[gameID].images.length == games[gameID].players.length) {
      io.to(gameID).emit("receive-image-data", games[gameID].images);
      delete games[gameID];
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
