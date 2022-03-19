import Home from "./Home";
import Room from "./Room";
import { useEffect, useState } from "react";
import { DEV_PORT } from "../../../env-constants.json";
import io from "socket.io-client";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [isInLobby, setIsInLobby] = useState(false);

  useEffect(() => {
    const newSocket = io(`http://localhost:${DEV_PORT}`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  return (
    <div className="App">
      {socket ? (
        isInLobby ? (
          <Room socket={socket} setIsInLobby={setIsInLobby} />
        ) : (
          <Home socket={socket} setIsInLobby={setIsInLobby} />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
