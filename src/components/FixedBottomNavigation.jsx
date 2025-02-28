import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import QuizIcon from '@mui/icons-material/Quiz';
import { useNavigate, useLocation } from "react-router-dom";

export default function FixedBottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const getNavigationIndex = (pathname) => {
    if (pathname === "/") return 0;
    if (pathname.startsWith("/materi")) return 1; // Pastikan menu Jelajah tetap aktif di halaman detail
    if (pathname.startsWith("/quiz")) return 2;
    if (pathname.startsWith("/profile")) return 3;
    return 0;
  };

  // Gunakan state untuk nilai BottomNavigation
  const [value, setValue] = React.useState(getNavigationIndex(location.pathname));
  
  // Update value ketika URL berubah
  React.useEffect(() => {
    setValue(getNavigationIndex(location.pathname));
  }, [location.pathname]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
    const paths = ["/", "/materi", "/quiz", "/profile"];
    navigate(paths[newValue]);
  };

  return (
    <Paper 
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        // left: "50%",
        // transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "444px",
        zIndex: 1000, 
      }}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Jelajah" icon={<PublicIcon />} />
        <BottomNavigationAction label="Quiz" icon={<QuizIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
