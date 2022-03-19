import GameModes from "../../../game_modes.json";

const GameForm = () => {
  const getGameModeOptions = () => {
    let modes = [];
    for (const mode in GameModes) {
      modes.push(<option value={GameModes[mode]}>{GameModes[mode]}</option>);
    }
    return modes;
  };
  return (
    <form>
      <h1>Create game</h1>
      <input type="password" title="Password" placeholder="Password" />
      <input type="number" min="30" max="120" defaultValue={60} />
      <select name="gameModes" id="gameModes">
        {getGameModeOptions()}
      </select>
      <button>Create game</button>
    </form>
  );
};

export default GameForm;
