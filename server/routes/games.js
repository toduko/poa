const express = require("express");
const GameManager = require("../GameManager");
const router = express.Router();

const gameManager = new GameManager();

router.get("/", (_, res) => {
  res.json(gameManager.games);
});

router.post("/", (req, res) => {
  const game = req.body;
  gameManager.addGame(game);
  res.sendStatus(200);
});

module.exports = router;
