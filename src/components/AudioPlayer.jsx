import React, { useRef, useEffect } from "react";
import backgroundMusic from "./assets/background-music.mp3";

export default function AudioPlayer() {
  const audioRef = useRef(null);

  useEffect(() => {
    // Coba mainkan audio setelah mount
    audioRef.current?.play().catch(err => {
      console.log("Audio play error", err);
    });
  }, []);

  return (
    <audio src={backgroundMusic} ref={audioRef} loop />
  );
}