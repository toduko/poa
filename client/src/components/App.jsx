import Home from "./Home";
import Room from "./Room";
import { useEffect, useState } from "react";
import { DEV_PORT } from "../../../env-constants.json";
import io from "socket.io-client";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [game, setGame] = useState(null);
  useEffect(() => {
    const newSocket = io(`http://localhost:${DEV_PORT}`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  return (
    <div className="App">
      {socket ? (
        game ? (
          <Room socket={socket} setGame={setGame} game={game} />
        ) : (
          <Home socket={socket} setGame={setGame} game={game} />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
