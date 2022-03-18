import { useParams } from "react-router-dom";
import Canvas from "./Canvas";

const Room = () => {
  const { roomId } = useParams();
  return (
    <div className="Room">
      <h1>Room {roomId}</h1>
      <Canvas color={"red"} />
    </div>
  );
};

export default Room;
