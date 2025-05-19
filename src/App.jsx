import React, { useState, useRef, useEffect } from "react";
import { Container, Box, AppBar, Toolbar, Typography } from "@mui/material";
import FixedBottomNavigation from "./components/FixedBottomNavigation";
import { Link, Outlet, useLocation } from "react-router-dom";
import backgroundMusic from "./assets/background-music.mp3";

import './App.css';

function App() {
  const location = useLocation();
  const isIndex = location.pathname === '/';

  const [playMusic, setPlayMusic] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (playMusic && audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log("Audio play error:", err);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [playMusic]);

  return (
    <Container
      disableGutters 
      maxWidth="xs" 
      // sx={{ width: "100%", margin: "0 auto"}}
            sx={{
        width: "100%",
        margin: "0 auto",
        display: {
          xs: "block",  // tampil di xs (mobile)
          sm: "none"    // sembunyikan mulai sm ke atas
        }
      }}
    >
      <>
        {playMusic && <audio src={backgroundMusic} ref={audioRef} loop />}

        {
          isIndex 
            ? null
            : (<AppBar position="sticky" color="primary">
                <Toolbar>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>LokaNesia</Typography>
                </Toolbar>
              </AppBar>)
        }

        <Box>
          <Outlet context={{ setPlayMusic }} />
        </Box>

        {
          isIndex
            ? null
            : <FixedBottomNavigation/> 
        }
         
      </>

    </Container>
  )
}

export default App
