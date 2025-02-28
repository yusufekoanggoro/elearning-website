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

  // Mapping URL path ke indeks BottomNavigation
  const pathToIndex = {
    "/": 0,
    "/materi": 1,
    "/quiz": 2,
    "/profile": 3
  };

  // Gunakan state untuk nilai BottomNavigation
  const [value, setValue] = React.useState(pathToIndex[location.pathname] || 0);

  // Update value ketika URL berubah
  React.useEffect(() => {
    setValue(pathToIndex[location.pathname] || 0);
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
        left: "50%",
        transform: "translateX(-50%)",
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
