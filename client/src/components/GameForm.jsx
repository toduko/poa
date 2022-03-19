import GameModes from "../../../game_modes.json";
import Button from "./Button";
import "../styles/GameForm.css";
import Heading from "./Heading";
import Password from "./Password";
import { useState } from "react";

const GameForm = ({ togglePopup }) => {
  const [input, setInput] = useState("");

  const getGameModeOptions = () => {
    let modes = [];
    for (const mode in GameModes) {
      modes.push(
        <option key={mode} value={GameModes[mode]}>
          {GameModes[mode]}
        </option>
      );
    }
    return modes;
  };

  return (
    <form>
      <Heading>Create game</Heading>
      <Password password={input} setPassword={setInput} />
      <input type="number" min="30" max="120" defaultValue={60} />
      <select name="gameModes">{getGameModeOptions()}</select>
      <div className="Button-group">
        <Button onClick={togglePopup}>Back</Button>
        <Button>Create game</Button>
      </div>
    </form>
  );
};

export default GameForm;
