import "../styles/GameCard.css";
import Button from "./Button";

const GameCard = ({ mode, timer, password, uid }) => {
  return (
    <div className="GameCard rounded-corners">
      <p>Game ID: {uid}</p>
      <p>Time: {timer} seconds</p>
      <p>Mode: {mode}</p>
      <div className="GameCard-join">
        <Button>Join</Button>
        {password && <input type="text" placeholder="Password" />}
      </div>
    </div>
  );
};

export default GameCard;
