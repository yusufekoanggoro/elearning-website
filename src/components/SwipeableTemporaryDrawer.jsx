import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import PlaceIcon from '@mui/icons-material/Place';
import PeopleIcon from '@mui/icons-material/People';
import MapIcon from '@mui/icons-material/Map';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LanguageIcon from '@mui/icons-material/Language';
import HomeIcon from '@mui/icons-material/Home';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import TheatersIcon from '@mui/icons-material/Theaters';

const items = [
  { text: 'Rumah Adat', icon: <HomeIcon color="primary" /> },
  { text: 'Baju Adat', icon: <CheckroomIcon color="secondary" /> },
  { text: 'Tarian Adat', icon: <EmojiPeopleIcon color="primary" /> },
  { text: 'Senjata Tradisional', icon: <SportsMartialArtsIcon color="secondary" /> },
  { text: 'Alat Musik', icon: <AudiotrackIcon color="secondary" /> },
  { text: 'Lagu Daerah', icon: <MusicNoteIcon color="primary" /> },
  { text: 'Seni Pertunjukan', icon: <TheatersIcon color="primary" /> },
];

export default function SwipeableTemporaryDrawer({ open, setOpen, selectedProvince }) {
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };

  const handleDetailClick = () => {
    console.log(selectedProvince)
    if (selectedProvince) {
      navigate(`/materi/detail/${selectedProvince.code}`);
    }
  };

  const list = (
    <Box sx={{ width: 'auto', p: 2 }}>
      {/* Card Informasi Provinsi */}
      <Card sx={{ backgroundColor: '#f5f5f5', borderRadius: 3, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" color="primary" textAlign="center">
            {selectedProvince?.name || "Nama Provinsi"}
          </Typography>

          {/* <Grid container spacing={2} sx={{ mt: 1 }}> */}
            {/* Ibu Kota */}
            {/* <Grid item xs={12} display="flex" alignItems="center">
              <PlaceIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body1">
                <b>Ibu Kota:</b> {selectedProvince?.PROVINSI || "-"}
              </Typography>
            </Grid> */}

            {/* Luas Wilayah */}
            {/* <Grid item xs={12} display="flex" alignItems="center">
              <MapIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body1">
                <b>Luas:</b> {selectedProvince?.area || "-"} km²
              </Typography>
            </Grid> */}

            {/* Jumlah Penduduk */}
            {/* <Grid item xs={12} display="flex" alignItems="center">
              <PeopleIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body1">
                <b>Penduduk:</b> {selectedProvince?.population || "-"} jiwa
              </Typography>
            </Grid> */}

            {/* Bahasa Daerah */}
            {/* <Grid item xs={12} display="flex" alignItems="center">
              <LanguageIcon  color="action" sx={{ mr: 1 }} />
              <Typography variant="body1">
                <b>Bahasa Daerah:</b> {selectedProvince?.languange || "-"}
              </Typography>
            </Grid> */}
          {/* </Grid> */}

          {/* Tombol Lihat Detail */}
          {/* <Button
            variant="contained"
            sx={{
              mt: 2,
              background: "linear-gradient(45deg, #007bff, #0056b3)",
              color: "white",
              borderRadius: "20px",
              px: 3,
              py: 1,
              "&:hover": {
                background: "linear-gradient(45deg, #0056b3, #003580)",
              },
            }}
            fullWidth
            onClick={handleDetailClick}
            disabled={!selectedProvince} // Disable jika ID tidak ada
            endIcon={<ArrowForwardIosIcon />}
          >
            Lihat Detail
          </Button> */}
        </CardContent>
      </Card>

      {/* Garis Pembatas */}
      <Divider sx={{ my: 2 }} />

      {/* List Informasi Budaya */}
      <List>
        {items.map(({ text, icon }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{ borderRadius: 2, "&:hover": { backgroundColor: "#f0f0f0" } }}>
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(45deg, #007bff, #0056b3)",
            color: "white",
            borderRadius: "20px",
            px: 3,
            py: 1,
            "&:hover": {
              background: "linear-gradient(45deg, #0056b3, #003580)",
            },
          }}
          onClick={handleDetailClick}
          disabled={!selectedProvince}
          endIcon={<ArrowForwardIosIcon />}
        >
          Lihat Detail
        </Button>
      </Box>
    </Box>
  );

  const iOS =
    typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      {list}
    </Drawer>
  );
}
