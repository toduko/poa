class GameManager {
  games = [];

  addGame(gameData) {
    const id = generateUID();
    this.games.push({ ...gameData, id });
  }

  removeGame(id) {
    this.games.filter((game) => game.id != id);
  }

  generateStr() {
    let result = "";
    let length = 16;
    let characters = "0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  generateUID() {
    let id;
    do {
      id = this.generateStr();
    } while (this.games.find((game) => game.id == id));

    return id;
  }
}

module.exports = GameManager;
