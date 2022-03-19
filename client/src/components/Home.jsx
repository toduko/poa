import { useState } from "react";
import Popup from "./Popup";
import GameForm from "./GameForm";
import GameList from "./GameList";

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
        <button onClick={togglePopup}>Back</button>
      </Popup>
      <GameList />
      <button onClick={togglePopup}>Create</button>
    </div>
  );
};

export default Home;
