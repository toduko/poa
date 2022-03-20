import React, { useState, useEffect } from "react";
import "../styles/Button.css";
import Button from "./Button";
import "../styles/Player.css";
window.isPLaying = false;

const useAudio = (url) => {
  if (!window.myAudio) {
    window.myAudio = new Audio(url);
  }
  const [audio] = useState(window.myAudio);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    window.musicState = !window.musicState;
    setPlaying(!playing);
    window.isPLaying = !window.isPLaying;

    // window.musicState ? window.Song.play() : window.Song.pause();
    if (window.musicState) {
      window.Song.pause();
      window.Song.play();
    } else {
      window.Song.play();
    }
  };

  useEffect(() => {
    if (window.musicState) audio.play();
    else audio.pause();
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
        {window.isPLaying ? "Pause" : "Play"}{" "}
      </Button>
    </div>
  );
};

export default Player;
