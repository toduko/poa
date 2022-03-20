import { useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import Canvas from "./Canvas";
import ColorPicker from "./ColorPicker";
import Heading from "./Heading";
import "../styles/Room.css";
import Timer from "./Timer.jsx";
import socket from "../socket";
import Player from "./Player";
import songUrl from "../assets/SongGood.mp3";

const Room = () => {
  const [roomState, setRoomState] = useState(0);
  const [color, setColor] = useState("black");
  const { roomId } = useParams();
  const canvasRef = useRef(null);

  const sendCanvasData = () => {
    const image = canvasRef.current
      .toDataURL("image/png")
      .replace("image/p ng", "image/octet-stream");
    socket.emit("send-canvas-image", image);
    changeRoomState();
  };

  const changeRoomState = () => {
    setRoomState(roomState + 1);
  };

  if (roomState === 0) {
    return (
      <div className="Room">
        <Player url={songUrl} />
        <Timer initialSeconds={10} timerOverHandler={changeRoomState} />
        <h1>Waiting state</h1>
      </div>
    );
  } else if (roomState === 1) {
    return (
      <div className="Room">
        <Player url={songUrl} />
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
    return (
      <div>
        <h1>Assembeled picture goes here</h1>
        <Player url={songUrl} />
      </div>
    );
  }
};

export default Room;
