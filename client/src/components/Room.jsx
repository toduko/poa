import { useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import Canvas from "./Canvas";
import ColorPicker from "./ColorPicker";
const Room = () => {
  const [color, setColor] = useState("black");
  const { roomId } = useParams();

  return (
    <div className="Room">
      <h1>Room {roomId}</h1>
      <ColorPicker setColor={setColor} />
      <Canvas color={color} />
    </div>
  );
};

export default Room;
