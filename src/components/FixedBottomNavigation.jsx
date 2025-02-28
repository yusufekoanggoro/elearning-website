import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import QuizIcon from '@mui/icons-material/Quiz';

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (_, newValue) => {
    setValue(newValue);
    if (newValue === 0) navigate("");
    if (newValue === 1) navigate("materi");
    if (newValue === 2) navigate("quiz");
    if (newValue === 3) navigate("profile");
  };

  return (
    <Paper 
      elevation={3}
      maxWidth="xs"
      sx={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%", // Gunakan 100% untuk mobile
        maxWidth: "444px", // Sesuaikan dengan ukuran mobile maksimal
        zIndex: 1000, 
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Jelajah" icon={<PublicIcon />} />
        <BottomNavigationAction label="Quiz" icon={<QuizIcon  />} />
      </BottomNavigation>
    </Paper>
  );
}
