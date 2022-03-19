import GameModes from "../../../game_modes.json";
import Button from "./Button";
import "../styles/GameForm.css";
import Heading from "./Heading";
import Password from "./Password";
import { useState } from "react";
import TimerVariants from "../../../timer_variants.json";
import ComboBox from "./ComboBox";
import socket from "../socket";

const GameForm = ({ togglePopup }) => {
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(TimerVariants[0]);
  const [mode, setMode] = useState(GameModes.CLASSIC);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, timer, mode, users: [socket.id] }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <Button submit>Create game</Button>
      </div>
    </form>
  );
};

export default GameForm;
