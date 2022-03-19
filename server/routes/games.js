const express = require("express");
const gameManager = require("../GameManager");
const router = express.Router();

router.get("/", (_, res) => {
  res.json(gameManager.games);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json(gameManager.find(id));
});

router.post("/", (req, res) => {
  const game = req.body;
  res.json(gameManager.addGame(game));
});

module.exports = router;
