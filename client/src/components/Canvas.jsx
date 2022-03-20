import { useEffect, useState } from "react";
import Button from "./Button";

const Canvas = ({
  width,
  height,
  color,
  canvasRef,
  clear = false,
  drawable = false,
  setImage,
  socket,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);

  const getCanvasData = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    return [canvas, context];
  };

  socket.on("receive-image-data", (images) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

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

  const updateImage = (canvas) => {
    setImage(canvas.toDataURL());
  };

  useEffect(() => {
    const [_, ctx] = getCanvasData();
    ctx.lineCap = "round";
    ctx.strokeStyle = color || "black";
    ctx.lineWidth = 5;
  }, [color]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const [canvas, ctx] = getCanvasData();
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    updateImage(canvas);
  };

  const endDrawing = () => {
    const [canvas, ctx] = getCanvasData();
    ctx.closePath();
    setIsDrawing(false);
    updateImage(canvas);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    const [canvas, ctx] = getCanvasData();
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    updateImage(canvas);
  };

  const handleClick = () => {
    const [canvas, ctx] = getCanvasData();
    ctx.clearRect(0, 0, width, height);
    updateImage(canvas);
  };

  return (
    <div>
      {clear && <Button onClick={handleClick}>Clear</Button>}
      <br />
      {drawable ? (
        <canvas
          width={width}
          height={height}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          style={{
            border: "1px solid black",
            margin: "auto",
          }}
        />
      ) : (
        <canvas
          width={width}
          height={height}
          ref={canvasRef}
          style={{
            border: "1px solid black",
            margin: "auto",
          }}
        />
      )}
    </div>
  );
};

export default Canvas;
