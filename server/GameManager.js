class GameManager {
  games = [];

  addGame(gameData) {
    const id = this.generateUID();
    const game = { ...gameData, id };
    this.games.push(game);
    return game;
  }

  joinGame(uid, gameID) {
    let error = false;
    let foundGame = false;
    this.games.forEach((game) => {
      if (game.id == gameID) {
        foundGame = true;
        if (game.users.includes(uid) || game.users.length == 4) error = true;
        else game.users.push(uid);
      }
    });
    return error || !foundGame;
  }

  disconnect(uid) {
    this.games = this.games.map((game) => ({
      ...game,
      users: game.users.filter((userID) => userID != uid),
    }));
    this.games = this.games.filter((game) => game.users.length > 0);
  }

  removeGame(id) {
    this.this.games.filter((game) => game.id != id);
  }

  findGame(id) {
    return this.games.find((game) => game.id == id);
  }

  generateStr() {
    const length = 16;
    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-";
    const charactersLength = characters.length;
    let result = "";
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

const gameManager = new GameManager();

module.exports = gameManager;
