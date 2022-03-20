import { useState } from "react";
import { useToggleState } from "../hooks";
import Popup from "./Popup";
import GameForm from "./GameForm";
import GameList from "./GameList";
import Button from "./Button";
import Heading from "./Heading";
import "../styles/Home.css";
import Player from "./Player";
import songUrl from "../assets/SongGood.mp3";

const Home = ({ socket, setGame }) => {
  const [isPopupActive, toggleIsPopupActive] = useToggleState(false);

  socket.on("game-joined", (game) => {
    setGame(game);
  });

  return (
    <div>
      <Heading>Home</Heading>
      <Player url={songUrl} />
      <GameList socket={socket} />
      <Button onClick={toggleIsPopupActive} className={"Home-create"}>
        Create
      </Button>
      <Popup show={isPopupActive}>
        <GameForm togglePopup={toggleIsPopupActive} socket={socket} />
      </Popup>
    </div>
  );
};

export default Home;
