import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import "../styles/GameList.css";

const GameList = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {}, []);

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
