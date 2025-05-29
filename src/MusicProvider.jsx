import React, { createContext, useRef, useEffect, useState } from 'react';
import musicMap from './musicMap';
import MusicContext from './MusicContext';

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentRegion, setCurrentRegion] = useState(null);
  const [currentMusicSrc, setCurrentMusicSrc] = useState(null);

  useEffect(() => {
    // Set volume awal saat audio pertama kali dibuat
    audioRef.current.volume = 1;
  }, []);

  useEffect(() => {
    const newMusic = musicMap[currentRegion];
    const audio = audioRef.current;

    if (!newMusic || newMusic === currentMusicSrc) return;

    let fadeOutInterval = null;
    let fadeInInterval = null;

    // Mulai fade out
    fadeOutInterval = setInterval(() => {
      if (audio.volume > 0.1) {
        audio.volume = Math.max(audio.volume - 0.1, 0);
      } else {
        clearInterval(fadeOutInterval);
        audio.pause();
        audio.src = newMusic;
        audio.volume = 0;
        audio.loop = true;

        audio.play().then(() => {
          // Setelah musik baru diputar, mulai fade in
          fadeInInterval = setInterval(() => {
            if (audio.volume < 1) {
              audio.volume = Math.min(audio.volume + 0.1, 1);
            } else {
              clearInterval(fadeInInterval);
            }
          }, 200);
        }).catch(console.error);

        setCurrentMusicSrc(newMusic);
      }
    }, 200);

    // Cleanup saat region berubah atau unmount
    return () => {
      clearInterval(fadeOutInterval);
      clearInterval(fadeInInterval);
    };
  }, [currentRegion, currentMusicSrc]);

  const playMusic = () => {
    audioRef.current.play().catch(console.error);
  };

  const pauseMusic = () => {
    audioRef.current.pause();
  };

  return (
    <MusicContext.Provider value={{ setCurrentRegion, playMusic, pauseMusic }}>
      {children}
    </MusicContext.Provider>
  );
};

export default MusicProvider;