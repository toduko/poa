import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import Canvas from "./Canvas";
import ColorPicker from "./ColorPicker";
import Heading from "./Heading";
import "../styles/Room.css";
import Timer from "./Timer.jsx";
import Button from "./Button";

const Room = ({ socket, game, setGame }) => {
  const [roomState, setRoomState] = useState(0);
  const [color, setColor] = useState("black");
  const { roomId } = useParams();
  const [image, setImage] = useState(new Image().src);
  const canvasRef = useRef(null);

  socket.on("game-start", () => {
    setRoomState(roomState + 1);
  });

  const sendCanvasData = () => {
    socket.emit("send-image-data", { gameID: game.id, image });
    changeRoomState();
  };

  const changeRoomState = () => {
    setRoomState(roomState + 1);
  };

  if (roomState === 0) {
    return (
      <div className="Room">
        <h1>Waiting state</h1>
      </div>
    );
  } else if (roomState === 1) {
    return (
      <div className="Room">
        <Heading>Room {roomId}</Heading>
        <Timer initialSeconds={2} timerOverHandler={sendCanvasData} />
        <ColorPicker setColor={setColor} activeColor={color} />
        <Canvas
          width={300}
          height={300}
          color={color}
          canvasRef={canvasRef}
          setImage={setImage}
          socket={socket}
          drawable
          clear
        />
      </div>
    );
  } else if (roomState === 2) {
    return (
      <>
        <Canvas
          width={600}
          height={600}
          canvasRef={canvasRef}
          socket={socket}
        />
        <Button onClick={() => setGame({})}>Leave</Button>
      </>
    );
  }
};

export default Room;
