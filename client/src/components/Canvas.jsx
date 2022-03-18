import { useRef, useEffect, useState } from "react";

const Canvas = ({ width, height }) => {
  const canvasRef = useRef(null);

  const getCtx = () => {
    const canvas = canvasRef.current;
    return canvas.getContext("2d");
  };

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const ctx = getCtx();

    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = getCtx();
    console.log(ctx);
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);

    setIsDrawing(true);
  };

  const endDrawing = () => {
    const ctx = getCtx();

    ctx.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    const ctx = getCtx();

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  return (
    <canvas
      width={width}
      height={height}
      onMouseDown={startDrawing}
      onMouseUp={endDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      style={{ border: "1px solid black", margin: "4rem auto" }}
    />
  );
};

export default Canvas;
