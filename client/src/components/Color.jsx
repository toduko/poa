import { useRef, useEffect, useState } from "react";

const Color = ({ setColor, color }) => {
  const handleClick = () => {
    setColor(color);
  };

  return <button onClick={handleClick} style={{ backgroundColor: color }} />;
};

export default Color;
