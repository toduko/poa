import { useState } from "react";
import "../styles/GameCard.css";
import Button from "./Button";
import Password from "./Password";

const GameCard = ({ mode, timer, password, uid }) => {
  const [input, setInput] = useState("");

  return (
    <div className="GameCard rounded-corners">
      <p>Game ID: {uid}</p>
      <p>Time: {timer} seconds</p>
      <p>Mode: {mode}</p>
      <div className="GameCard-join">
        <Button disabled={input != password}>Join</Button>
        {password && <Password password={input} setPassword={setInput} />}
      </div>
    </div>
  );
};

export default GameCard;
