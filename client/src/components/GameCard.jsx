import { useState } from "react";
import "../styles/GameCard.css";
import Button from "./Button";
import Password from "./Password";
import { Link } from "react-router-dom";

const GameCard = ({ mode, timer, password, uid, socket }) => {
  const [input, setInput] = useState("");

  const handleClick = () => {
    socket.emit("join-game", { userID: socket.id, gameID: uid });
  };

  return (
    <div className="GameCard rounded-corners">
      <p>Game ID: {uid}</p>
      <p>Time: {timer} seconds</p>
      <p>Mode: {mode}</p>
      <div className="GameCard-join">
        <Button onClick={handleClick} disabled={input != password}>
          Join
        </Button>
        {password && <Password password={input} setPassword={setInput} />}
      </div>
    </div>
  );
};

export default GameCard;
