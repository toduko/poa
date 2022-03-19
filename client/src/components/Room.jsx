import { useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import Canvas from "./Canvas";
import ColorPicker from "./ColorPicker";
import Heading from "./Heading";
import "../styles/Room.css";
import Timer from "./Timer.jsx";
import socket from "../socket";

const Room = () => {
  const [color, setColor] = useState("black");
  const { roomId } = useParams();
  const canvasRef = useRef(null);

  const sendCanvasData = () => {
    const image = canvasRef.current
      .toDataURL("image/png")
      .replace("image/p ng", "image/octet-stream");
    socket.emit("send-canvas-image", image);
  };

  return (
    <div className="Room">
      <Heading>Room {roomId}</Heading>
      <Timer initialSeconds={5} timerOverHandler={sendCanvasData} />
      <ColorPicker setColor={setColor} activeColor={color} />
      <Canvas
        width={0.7 * window.innerWidth}
        height={0.7 * window.innerHeight}
        color={color}
        canvasRef={canvasRef}
      />
    </div>
  );
};

export default Room;
