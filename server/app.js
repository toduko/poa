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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (ENV == "prod") {
  app.use(express.static(path.resolve(__dirname, "../client/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
  });
}

io.on("connection", (socket) => {
  console.log("A user connected");
  // console.log(socket);
  socket.on("disconnect", (_) => {
    console.log(`User with id: ${socket.id} disconnected`);
  });

  socket.on("create-game", (game) => {
    socket.emit("update-lobby", game);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
