import { useState } from "react";
import Popup from "./Popup";
import GameForm from "./GameForm";
import GameList from "./GameList";
import Button from "./Button";

const Home = () => {
  const [isPopupActive, setIsPopupActive] = useState(false);

  const togglePopup = () => {
    setIsPopupActive(!isPopupActive);
  };

  return (
    <div>
      <h1>Home</h1>
      <Popup show={isPopupActive}>
        <GameForm />
        <Button onClick={togglePopup}>Back</Button>
      </Popup>
      <GameList />
      <Button onClick={togglePopup}>Create</Button>
    </div>
  );
};

export default Home;
