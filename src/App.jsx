import React, { useState } from "react";
import { Container, Box, AppBar, Toolbar, Typography } from "@mui/material";
import FixedBottomNavigation from "./components/FixedBottomNavigation";
import { Link, Outlet, useLocation } from "react-router-dom";
import './App.css';

function App() {
  const location = useLocation();

  return (
    <Container
      disableGutters 
      maxWidth="xs" 
      sx={{ width: "100%", margin: "0 auto"}}
    >
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>LokaNesia</Typography>
        </Toolbar>
      </AppBar>

      <Box>
        <Outlet />
      </Box>

      {/* <Box 
        sx={{ 
          position: "fixed", 
          bottom: 0, 
          left: "50%", 
          transform: "translateX(-50%)", 
          width: "100%", 
          maxWidth: "444px", // Sesuaikan dengan maxWidth xs dari Material UI
          zIndex: 1000
        }}
      >
      </Box> */}
        <FixedBottomNavigation/>
    </Container>
  )
}

export default App
