import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import GameModes from "../../../game_modes.json";

const GAMES = [
  { uid: 0, mode: GameModes.CLASSIC, timer: 60, password: "1234" },
  { uid: 1, mode: GameModes.THEME, timer: 30, password: "" },
  { uid: 2, mode: GameModes.CLASSIC, timer: 120, password: "1234456566" },
];

const GameList = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    setGames(GAMES);
    // fetch("/api/games")
    //   .then((res) => res.json())
    //   .then((data) => console.log(data.games))
    //   .catch((err) => console.error(err));
  }, []);

  return (
    <ul>
      {games.map((game) => (
        <GameCard
          key={game.uid}
          uid={game.uid}
          timer={game.timer}
          password={game.password}
          mode={game.mode}
        />
      ))}
    </ul>
  );
};

export default GameList;
