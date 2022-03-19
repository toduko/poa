import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Canvas from "./Canvas";
import ColorPicker from "./ColorPicker";
import Heading from "./Heading";
import "../styles/Room.css";
import Timer from "./Timer.jsx";

const Room = ({ socket, setGame, game }) => {
  const [roomState, setRoomState] = useState(0);
  const [color, setColor] = useState("black");
  const { roomId } = useParams();
  const canvasRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      socket.emit("update-lobby", game);

      setCount(count + 1);
    }, 300);

    return () => clearTimeout(timer);
  }, [count]);

  const sendCanvasData = () => {
    const image = canvasRef.current
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    // send image to player
    changeRoomState();
  };

  const changeRoomState = () => {
    setRoomState(roomState + 1);
  };

  if (roomState === 0) {
    return (
      <div className="Room">
        <Timer initialSeconds={10} timerOverHandler={changeRoomState} />
        <h1>Waiting state</h1>
      </div>
    );
  } else if (roomState === 1) {
    return (
      <div className="Room">
        <Heading>Room {roomId}</Heading>
        <Timer initialSeconds={10} timerOverHandler={sendCanvasData} />
        <ColorPicker setColor={setColor} activeColor={color} />
        <Canvas
          width={0.7 * window.innerWidth}
          height={0.7 * window.innerHeight}
          color={color}
          canvasRef={canvasRef}
        />
      </div>
    );
  } else if (roomState === 2) {
    return <h1>Assembeled picture goes here</h1>;
  }
};

export default Room;
