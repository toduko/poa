const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
  res.json({ games: [] });
});

module.exports = router;
