import { useEffect, useRef, useState } from "react";
import ColorPicker from "./ColorPicker";
import Heading from "./Heading";
import "../styles/Room.css";
import Timer from "./Timer.jsx";
import Player from "./Player";
import songUrl from "../assets/SongGood.mp3";
import Button from "./Button";
import GameModes from "../../../game_modes.json";

const Room = ({ socket, game }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [roomState, setRoomState] = useState(0);
  const [color, setColor] = useState("black");
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
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
    changeRoomState();
    const canvasImages = images.map((image) => {
      const img = new Image(300, 300);
      img.src = image;
      return img;
    });
    setImages(canvasImages);
  });

  useEffect(() => {
    console.log(game);
    if (roomState == 3) {
      updateCanvasData();
      images[0].onload = () => {
        ctx.drawImage(images[0], 0, 0, 300, 300);
      };
      images[1].onload = () => {
        ctx.drawImage(images[1], 300, 0, 300, 300);
      };
      images[2].onload = () => {
        ctx.drawImage(images[2], 0, 300, 300, 300);
      };
      images[3].onload = () => {
        ctx.drawImage(images[3], 300, 300, 300, 300);
      };
    }
  }, [roomState]);

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
    ctx.clearRect(0, 0, 300, 300);
  };

  if (roomState === 0) {
    return (
      <div className="Room">
        <Player url={songUrl} />
        <Heading>Room {game.id}</Heading>
        <Heading>Waiting for players</Heading>
      </div>
    );
  } else if (roomState === 1) {
    return (
      <div className="Room">
        <Player url={songUrl} />
        <Heading>Room {game.id}</Heading>
        {game.mode == GameModes.THEME && (
          <Heading>Your theme is {game.theme}</Heading>
        )}
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
      </div>
    );
  } else if (roomState === 2) {
    return <Heading>Waiting for other players</Heading>;
  } else if (roomState === 3) {
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
