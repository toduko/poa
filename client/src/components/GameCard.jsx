const GameCard = ({ mode, timer, password, uid }) => {
  return (
    <div>
      <p>
        {mode} {timer} {password} {uid}
      </p>
    </div>
  );
};

export default GameCard;
