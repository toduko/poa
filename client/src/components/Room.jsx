import { useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import Canvas from "./Canvas";
import ColorPicker from "./ColorPicker";
import Heading from "./Heading";
import "../styles/Room.css";

const Room = () => {
  const [color, setColor] = useState("black");
  const { roomId } = useParams();

  return (
    <div className="Room">
      <Heading>Room {roomId}</Heading>
      <ColorPicker setColor={setColor} activeColor={color} />
      <Canvas
        width={0.7 * window.innerWidth}
        height={0.7 * window.innerHeight}
        color={color}
      />
    </div>
  );
};

export default Room;
