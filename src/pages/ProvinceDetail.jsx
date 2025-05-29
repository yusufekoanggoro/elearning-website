import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Card, CardMedia, CardContent, Grid, Button, Chip, Divider, Link, Tooltip
} from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MusicContext from '../MusicContext';
import Snackbar from '@mui/material/Snackbar';

const provincesData = {
  "32": {
    name: "Jawa Barat",
    capital: "Bandung",
    area: 35377,
    population: 48770000,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Coat_of_arms_of_West_Java.svg/129px-Coat_of_arms_of_West_Java.svg.png",
    cultures: [
      {
        name: "Rumah Adat",
        data: [
          {
            name: "Rumah Adat Togok Anjing",
            image: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1634025439/01jmvpzbjrxa4b7rgt4pf6esj3.jpg"
          },
          {
            name: "Imah Julang Ngapak",
            image: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1634025439/01jmvpzbjrxa4b7rgt4pf6esj3.jpg"
          },
          {
            name: "Imah Jolopong",
            image: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1634025439/01jmvpzbjrxa4b7rgt4pf6esj3.jpg"
          },
          {
            name: "Imah Badak Heuay",
            image: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1634025439/01jmvpzbjrxa4b7rgt4pf6esj3.jpg"
          },
          {
            name: "Imah Perahu Kumureb",
            image: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1634025439/01jmvpzbjrxa4b7rgt4pf6esj3.jpg"
          },
          {
            name: "Rumah Adat Kasepuhan Cirebon",
            image: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1634025439/01jmvpzbjrxa4b7rgt4pf6esj3.jpg"
          },
          {
            name: "Rumah Adat Buka Palayu",
            image: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1634025439/01jmvpzbjrxa4b7rgt4pf6esj3.jpg"
          }
        ]
      },
      {
        name: "Baju Adat",
        data: [
          {
            name: "Pangsi",
            image: "https://www.dailysports.id/upload/large/974ae4a50ec53ee0ca78b0be4190a8e4.jpeg"
          }
        ]
      },
      {
        name: "Tarian",
        data: [
          {
            name: "Jaipong",
            image: "https://blog-static.mamikos.com/wp-content/uploads/2023/12/Nama-Tarian-Tradisional-Jawa-Barat-beserta-Gambar-1.jpg.webp"
          }
        ]
      },
      {
        name: "Senjata",
        data: [
          {
            name: "Kujang",
            image: "https://blog-static.mamikos.com/wp-content/uploads/2023/01/1.-Kujang.jpg.webp"
          }
        ]
      },
      {
        name: "Makanan Khas",
        data: [
          {
            name: "Karedok",
            image: "https://cnc-magazine.oramiland.com/parenting/images/Karedok.width-800.format-webp.webp"
          }
        ]
      },
      {
        name: "Alat Musik",
        data: [
          {
            name: "Angklung",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Indonesianbamboomusicangklung.jpg/281px-Indonesianbamboomusicangklung.jpg"
          },
          {
            name: "Calung",
            image: "https://upload.wikimedia.org/wikipedia/id/thumb/5/5d/Calung-sunda.jpg/500px-Calung-sunda.jpg"
          }
        ]
      },
      {
        name: "Lagu Daerah",
        data: [
          {
            name: "Manuk Dadali",
            ytUrl: "https://www.youtube.com/watch?v=zASs9t6D6EU"
          },
          {
            name: "Bubuy Bulan",
            ytUrl: "https://www.youtube.com/watch?v=Vz2w93wUgtQ"
          }
        ]
      },
      {
        name: "Seni Pertunjukan",
        data: [
          {
            name: "Angklung Bungko",
            ytUrl: "https://www.youtube.com/watch?v=yz5p3f2jKLU"
          }
        ]
      }
    ]
  }
};

const ProvinceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const province = provincesData[id];

  const { setCurrentRegion, playMusic, pauseMusic } = useContext(MusicContext);
  const [isPlaying, setIsPlaying] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  useEffect(() => {
    setCurrentRegion(province.name); // Akan otomatis play saat masuk
    setIsPlaying(true);

    return () => {
      pauseMusic(); // Hentikan musik saat keluar
      setIsPlaying(false);
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      pauseMusic();
      setSnackbarMsg('Musik dijeda');
    } else {
      playMusic();
      setSnackbarMsg('Musik diputar');
    }
    setSnackbarOpen(true);
    setIsPlaying(!isPlaying);
  };


  if (!province) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h5" color="error">Provinsi tidak ditemukan!</Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>Kembali</Button>
      </Box>
    );
  }

  const { name, capital, area, population, image, cultures } = province;

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', px: 2, py: 4 }}>
      {/* <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Kembali
      </Button> */}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        message={snackbarMsg}
        onClose={() => setSnackbarOpen(false)}
      />

<Box
  sx={{
    position: 'fixed',
    top: 35,
    right: 16,
    zIndex: 1300, // pastikan muncul di atas konten
  }}
>
  <Button
    variant="contained"
    color={isPlaying ? 'warning' : 'primary'}
    onClick={handleTogglePlay}
    sx={{ boxShadow: 4 }}
  >
    {isPlaying ? 'Pause Musik' : 'Putar Musik'}
  </Button>
</Box>

      <Card sx={{ mb: 3, p: 2, boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={name}
          sx={{ objectFit: 'contain', bgcolor: '#fafafa' }}
        />
      </Card>

      <Typography variant="h4" fontWeight="bold" gutterBottom>{name}</Typography>
      <Box mb={3}>
        <Typography><b>Ibu Kota:</b> {capital}</Typography>
        <Typography><b>Luas:</b> {area.toLocaleString()} km²</Typography>
        <Typography><b>Penduduk:</b> {population.toLocaleString()} jiwa</Typography>
      </Box>

      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" fontWeight="bold" gutterBottom>Budaya Daerah</Typography>

      {cultures.map((culture, i) => (
        <Box key={i} sx={{ mb: 4 }}>
          <Chip
            label={culture.name}
            color="primary"
            variant="outlined"
            sx={{ mb: 2, fontSize: '1rem', fontWeight: 'bold' }}
          />

          <Grid container spacing={2}>
            {culture.data.map((item, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': { transform: 'scale(1.03)', boxShadow: 6 }
                  }}
                >
                  {item.image && (
                    <CardMedia
                      component="img"
                      height="160"
                      image={item.image}
                      alt={item.name}
                      sx={{ objectFit: 'cover' }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                      {item.name}
                    </Typography>
                    {item.ytUrl && (
                      <Tooltip title="Tonton di YouTube">
                        <Link
                          href={item.ytUrl}
                          target="_blank"
                          rel="noopener"
                          underline="hover"
                          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                        >
                          <YouTubeIcon color="error" fontSize="small" /> Tonton di YouTube
                        </Link>
                      </Tooltip>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default ProvinceDetail;
