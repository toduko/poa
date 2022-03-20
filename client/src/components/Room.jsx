import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ColorPicker from "./ColorPicker";
import Heading from "./Heading";
import "../styles/Room.css";
import Timer from "./Timer.jsx";
import Player from "./Player";
import songUrl from "../assets/SongGood.mp3";
import Button from "./Button";

const Room = ({ socket, game, setGame }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [roomState, setRoomState] = useState(0);
  const [color, setColor] = useState("black");
  const canvasRef = useRef(null);
  let canvas, ctx;

  const updateCanvasData = () => {
    if (canvasRef.current) {
      canvas = canvasRef.current;
      ctx = canvas.getContext("2d");
      ctx.lineCap = "round";
      ctx.lineWidth = 5;
      ctx.strokeStyle = color;
    }
  };

  socket.on("game-start", () => {
    setRoomState(roomState + 1);
  });

  const sendCanvasData = () => {
    updateCanvasData();

    socket.emit("send-image-data", {
      gameID: game.id,
      image: canvas.toDataURL(),
    });

    changeRoomState();
  };

  const changeRoomState = () => {
    setRoomState(roomState + 1);
  };

  socket.on("receive-image-data", (images) => {
    updateCanvasData();

    const canvasImages = images.map((image) => {
      const img = new Image(300, 300);
      img.src = image;
      return img;
    });

    canvasImages[0].onload = () => {
      ctx.drawImage(canvasImages[0], 0, 0, 300, 300);
    };
    canvasImages[1].onload = () => {
      ctx.drawImage(canvasImages[1], 300, 0, 300, 300);
    };
    canvasImages[2].onload = () => {
      ctx.drawImage(canvasImages[2], 0, 300, 300, 300);
    };
    canvasImages[3].onload = () => {
      ctx.drawImage(canvasImages[3], 300, 300, 300, 300);
    };
  });

  useEffect(() => {
    if (roomState == 1) {
      updateCanvasData();
    }
  }, [color]);

  const startDrawing = ({ nativeEvent }) => {
    updateCanvasData();
    const { offsetX, offsetY } = nativeEvent;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const endDrawing = () => {
    updateCanvasData();
    ctx.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    updateCanvasData();
    const { offsetX, offsetY } = nativeEvent;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const handleClick = () => {
    updateCanvasData();
    ctx.clearRect(0, 0, width, height);
  };

  if (roomState === 0) {
    return (
      <div className="Room">
        <Player url={songUrl} />
        <h1>Waiting state</h1>
      </div>
    );
  } else if (roomState === 1) {
    return (
      <div className="Room">
        <Player url={songUrl} />
        <Heading>Room {roomId}</Heading>
        <Timer initialSeconds={game.timer} timerOverHandler={sendCanvasData} />
        <ColorPicker setColor={setColor} activeColor={color} />
        <Button onClick={handleClick}>Clear</Button>
        <br />
        <canvas
          width={300}
          height={300}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          style={{
            border: "1px solid black",
            margin: "auto",
          }}
        />
      </>
    );
  } else if (roomState === 2) {
    return (
      <>
        <canvas
          width={600}
          height={600}
          ref={canvasRef}
          style={{
            border: "1px solid black",
            margin: "auto",
          }}
        />
        <Button onClick={() => window.location.reload(false)}>Leave</Button>
        <Player url={songUrl} />
      </>
    );
  }
};

export default Room;
