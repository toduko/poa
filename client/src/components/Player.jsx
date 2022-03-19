import React, { useState, useEffect } from "react";
import "../styles/Button.css";
import Button from "./Button";
import "../styles/Player.css";

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", function () {
      audio.currentTime = 0;
      audio.play();
    });
  }, []);

  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <Button onClick={toggle} className={"Volume-Button"}>
        {playing ? "Mute" : "Unmute"}{" "}
      </Button>
    </div>
  );
};

export default Player;
