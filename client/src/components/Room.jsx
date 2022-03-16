import { useParams } from "react-router-dom";

const Room = () => {
  const { roomId } = useParams();
  return <h1>Room {roomId}</h1>;
};

export default Room;
