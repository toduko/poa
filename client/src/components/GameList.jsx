import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import "../styles/GameList.css";

const GameList = ({ socket }) => {
  const [games, setGames] = useState({});

  socket.on("update-games", (games) => {
    setGames(games);
  });

  const getGamesList = () => {
    let gamesList = [];
    for (const gameID in games) {
      const game = games[gameID];
      if (!game.started)
        gamesList.push(
          <GameCard
            socket={socket}
            key={gameID}
            uid={gameID}
            timer={game.timer}
            password={game.password}
            mode={game.mode}
          />
        );
    }

    return gamesList;
  };

  return <ul className="GameList">{getGamesList()}</ul>;
};

export default GameList;
