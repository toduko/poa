import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import "../styles/GameList.css";

const GameList = ({ socket }) => {
  const [games, setGames] = useState([]);

  socket.on("update-lobby", (game) => {
    if (!games.find((game) => game.id == socket.id)) {
      setGames([...games, game]);
    }
  });

  return (
    <ul className="GameList">
      {games.map((game) => (
        <GameCard
          key={game.id}
          uid={game.id}
          timer={game.timer}
          password={game.password}
          mode={game.mode}
        />
      ))}
    </ul>
  );
};

export default GameList;
