import React, { useState } from "react";
import { Container, Box, AppBar, Toolbar, Typography } from "@mui/material";
import FixedBottomNavigation from "./components/FixedBottomNavigation";
import { Link, Outlet, useLocation } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";

import './App.css';

function App() {
  const location = useLocation();

  const [showSplash, setShowSplash] = useState(true);

  return (
    <Container
      disableGutters 
      maxWidth="xs" 
      sx={{ width: "100%", margin: "0 auto"}}
    >

      {
        showSplash 
          ? <SplashScreen onFinish={() => setShowSplash(false)} />
          : <>
            <AppBar position="sticky" color="primary">
              <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>LokaNesia</Typography>
              </Toolbar>
            </AppBar>

            <Box>
              <Outlet />
            </Box>

            <FixedBottomNavigation/>          
          </>

      }
    </Container>
  )
}

export default App
