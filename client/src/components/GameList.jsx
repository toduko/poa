import { useEffect } from "react";

const GameList = () => {
  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);
  return <h1>GameList</h1>;
};

export default GameList;
