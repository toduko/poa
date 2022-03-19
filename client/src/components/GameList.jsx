import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import GameModes from "../../../game_modes.json";
import "../styles/GameList.css";

const GameList = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error(err));
  }, []);

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
