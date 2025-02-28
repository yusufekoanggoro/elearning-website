import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";

const SplashScreen = ({ onFinish }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      onFinish(); // Menyelesaikan splash screen
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <Box>
        <Backdrop 
            open={open} 
            sx={{ color: "#fff", zIndex: 1300, flexDirection: "column" }}
        >
        <Typography variant="h5">LokaNesia</Typography>
        <CircularProgress color="inherit" sx={{ mt: 2 }} />
        </Backdrop>

    </Box>
  );
};

export default SplashScreen;