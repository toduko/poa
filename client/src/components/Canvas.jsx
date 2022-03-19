import { useRef, useEffect, useState } from "react";

const Canvas = ({ width, height, color, canvasRef }) => {
  const [isDrawing, setIsDrawing] = useState(false);

  const getCtx = () => {
    const canvas = canvasRef.current;
    return canvas.getContext("2d");
  };

  useEffect(() => {
    const ctx = getCtx();
    ctx.lineCap = "round";
    ctx.strokeStyle = color || "black";
    ctx.lineWidth = 5;
  }, [color]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = getCtx();
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
      style={{
        border: "1px solid black",
        margin: "auto",
      }}
    />
  );
};

export default Canvas;
