// Imports
const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Routes
const gamesRouter = require("./routes/games");

// Environment variables
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3001;

app.use("/games", gamesRouter);

if (ENV == "prod") {
  app.use(express.static(path.resolve(__dirname, "../client/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
  });
}

io.on("connection", (socket) => {
  console.log("A user connected");
  console.log(socket);
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
