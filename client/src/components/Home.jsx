import { useState } from "react";
import Popup from "./Popup";
import GameForm from "./GameForm";
import GameList from "./GameList";
import Button from "./Button";
import Heading from "./Heading";
import "../styles/Home.css";

const Home = () => {
  const [isPopupActive, setIsPopupActive] = useState(false);

  const togglePopup = () => {
    setIsPopupActive(!isPopupActive);
  };

  return (
    <div>
      <Heading>Home</Heading>
      <GameList />
      <Button onClick={togglePopup} className={"Home-create"}>
        Create
      </Button>
      <Popup show={isPopupActive}>
        <GameForm togglePopup={togglePopup} />
      </Popup>
    </div>
  );
};

export default Home;
