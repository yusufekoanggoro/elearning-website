import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

const SplashScreen = () => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // Simulasi loading selama 3 detik sebelum splash screen hilang
    const timer = setTimeout(() => {
      setOpen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Backdrop open={open} sx={{ color: "#fff", zIndex: 1300, flexDirection: "column" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        My App
      </Typography>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default SplashScreen;