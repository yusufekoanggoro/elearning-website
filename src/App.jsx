import React, { useState } from "react";
import { Container, Box, AppBar, Toolbar, Typography } from "@mui/material";
import FixedBottomNavigation from "./components/FixedBottomNavigation";
import { Link, Outlet, useLocation } from "react-router-dom";

import './App.css';

function App() {
  const location = useLocation();
  const isIndex = location.pathname === '/';

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
          <Outlet />
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
