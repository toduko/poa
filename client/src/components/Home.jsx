import { useState } from "react";
import Popup from "./Popup";
import GameForm from "./GameForm";
import GameList from "./GameList";
import Button from "./Button";
import Heading from "./Heading";

const Home = () => {
  const [isPopupActive, setIsPopupActive] = useState(false);

  const togglePopup = () => {
    setIsPopupActive(!isPopupActive);
  };

  return (
    <div>
      <Heading>Home</Heading>
      <GameList />
      <Button onClick={togglePopup}>Create</Button>
      <Popup show={isPopupActive}>
        <GameForm togglePopup={togglePopup} />
      </Popup>
    </div>
  );
};

export default Home;
