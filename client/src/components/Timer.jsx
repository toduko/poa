import React from "react";
import { useState, useEffect } from "react";

const Timer = ({ initialSeconds, timerOverHandler }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSeconds(seconds - (seconds > 0));
      if (seconds == 0) {
        timerOverHandler();
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  return <h1>{seconds}</h1>;
};

export default Timer;
