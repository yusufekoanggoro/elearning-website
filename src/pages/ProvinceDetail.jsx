import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, CardMedia, CardContent, Typography, Button, Stack, Grid, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const provincesData = {
  "32": {
    name: "Jawa Barat",
    capital: "Bandung",
    area: 35377,
    population: 48770000,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Coat_of_arms_of_West_Java.svg/129px-Coat_of_arms_of_West_Java.svg.png",
    cultures: [
      { name: "Rumah Adat: Rumah Kasepuhan", image: "https://cdnwpedutorenews.gramedia.net/wp-content/uploads/2021/11/23190439/unnamed-25.png" },
      { name: "Baju Adat: Pangsi", image: "https://source.unsplash.com/300x200/?traditional-clothes" },
      { name: "Tarian: Jaipong", image: "https://source.unsplash.com/300x200/?traditional-dance" },
      { name: "Senjata: Kujang", image: "https://source.unsplash.com/300x200/?traditional-weapon" }
    ]
  },
  "jawa-tengah": {
    name: "Jawa Tengah",
    capital: "Semarang",
    area: 32800,
    population: 36740000,
    image: "https://source.unsplash.com/600x400/?semarang",
    cultures: [
      { name: "Rumah Adat: Joglo", image: "https://source.unsplash.com/300x200/?traditional-house" },
      { name: "Baju Adat: Kebaya", image: "https://source.unsplash.com/300x200/?traditional-clothes" },
      { name: "Tarian: Gambyong", image: "https://source.unsplash.com/300x200/?traditional-dance" },
      { name: "Senjata: Keris", image: "https://source.unsplash.com/300x200/?traditional-weapon" }
    ]
  }
};

const ProvinceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const province = provincesData[id];

  if (!province) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h5" color="error">Provinsi tidak ditemukan!</Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>Kembali</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3, pb: 9, bgcolor: '#f7f7f7', borderRadius: 3}}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Kembali
      </Button>

      <Card sx={{ borderRadius: 3, boxShadow: 4, overflow: 'hidden' }}>
        <CardMedia component="img" height="250" image={province.image} alt={province.name} sx={{ objectFit: 'cover' }} />
      </Card>

      <Paper elevation={3} sx={{ mt: -3, p: 3, bgcolor: 'white', borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>{province.name}</Typography>
        <Stack spacing={1}>
          <Typography variant="body1"><b>Ibu Kota:</b> {province.capital}</Typography>
          <Typography variant="body1"><b>Luas:</b> {province.area.toLocaleString()} km²</Typography>
          <Typography variant="body1"><b>Penduduk:</b> {province.population.toLocaleString()} jiwa</Typography>
        </Stack>
      </Paper>

      <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mt: 4 }}>
        Budaya Daerah:
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {province.cultures.map((culture, index) => (
          <Grid item xs={12} key={index}>
            <Card sx={{ boxShadow: 3, borderRadius: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardMedia
                component="img"
                height="180"
                image={culture.image}
                alt={culture.name}
              />
              <CardContent sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">{culture.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProvinceDetail;
