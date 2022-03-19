import GameModes from "../../../game_modes.json";
import Button from "./Button";
import "../styles/GameForm.css";
import Heading from "./Heading";
import Password from "./Password";
import { useState } from "react";
import TimerVariants from "../../../timer_variants.json";
import ComboBox from "./ComboBox";

const GameForm = ({ togglePopup }) => {
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(TimerVariants[0]);
  const [mode, setMode] = useState(GameModes.CLASSIC);

  return (
    <form>
      <Heading>Create game</Heading>
      <div className="GameForm-password">
        Password:
        <Password password={input} setPassword={setInput} />
      </div>
      <ComboBox
        options={TimerVariants}
        currentOption={timer}
        setCurrentOption={setTimer}
      >
        Time:
      </ComboBox>
      <ComboBox
        options={Object.values(GameModes)}
        currentOption={mode}
        setCurrentOption={setMode}
      >
        Mode:
      </ComboBox>
      <div className="Button-group">
        <Button onClick={togglePopup}>Back</Button>
        <Button>Create game</Button>
      </div>
    </form>
  );
};

export default GameForm;
