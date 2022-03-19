import { useState } from "react";
import "../styles/GameCard.css";
import Button from "./Button";
import Password from "./Password";
import { Link } from "react-router-dom";

const GameCard = ({ mode, timer, password, uid }) => {
  const [input, setInput] = useState("");

  return (
    <div className="GameCard rounded-corners">
      <p>Game ID: {uid}</p>
      <p>Time: {timer} seconds</p>
      <p>Mode: {mode}</p>
      <div className="GameCard-join">
        <Link to={`/room/${uid}`}>
          <Button disabled={input != password}>Join</Button>
        </Link>
        {password && <Password password={input} setPassword={setInput} />}
      </div>
    </div>
  );
};

export default GameCard;
