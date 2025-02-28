import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, CardMedia, CardContent, Typography, Button, Stack, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const provincesData = {
  "32": {
    name: "Jawa Barat",
    capital: "Bandung",
    area: 35377,
    population: 48770000,
    image: "https://source.unsplash.com/600x400/?bandung",
    cultures: [
      { name: "Rumah Adat: Rumah Kasepuhan", image: "https://source.unsplash.com/200x200/?traditional-house" },
      { name: "Baju Adat: Pangsi", image: "https://source.unsplash.com/200x200/?traditional-clothes" },
      { name: "Tarian: Jaipong", image: "https://source.unsplash.com/200x200/?traditional-dance" },
      { name: "Senjata: Kujang", image: "https://source.unsplash.com/200x200/?traditional-weapon" }
    ]
  },
  "jawa-tengah": {
    name: "Jawa Tengah",
    capital: "Semarang",
    area: 32800,
    population: 36740000,
    image: "https://source.unsplash.com/600x400/?semarang",
    cultures: [
      { name: "Rumah Adat: Joglo", image: "https://source.unsplash.com/200x200/?traditional-house" },
      { name: "Baju Adat: Kebaya", image: "https://source.unsplash.com/200x200/?traditional-clothes" },
      { name: "Tarian: Gambyong", image: "https://source.unsplash.com/200x200/?traditional-dance" },
      { name: "Senjata: Keris", image: "https://source.unsplash.com/200x200/?traditional-weapon" }
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
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Kembali
      </Button>

      <Card sx={{ borderRadius: 3, boxShadow: 4, position: 'relative' }}>
        {/* Gambar Provinsi */}
        <CardMedia component="img" height="250" image={province.image} alt={province.name} />

        {/* Nama Provinsi dalam Overlay */}
        <Box sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          textAlign: "center",
          py: 1
        }}>
          <Typography variant="h5" fontWeight="bold">
            {province.name}
          </Typography>
        </Box>

        {/* Deskripsi */}
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="body1"><b>Ibu Kota:</b> {province.capital}</Typography>
            <Typography variant="body1"><b>Luas:</b> {province.area.toLocaleString()} km²</Typography>
            <Typography variant="body1"><b>Penduduk:</b> {province.population.toLocaleString()} jiwa</Typography>
          </Stack>

          {/* Budaya */}
          <Typography variant="h6" fontWeight="bold" color="secondary" sx={{ mt: 2 }}>
            Budaya Daerah:
          </Typography>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            {province.cultures.map((culture, index) => (
              <Grid item xs={6} key={index}>
                <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="100"
                    image={culture.image}
                    alt={culture.name}
                  />
                  <CardContent sx={{ textAlign: "center", p: 1 }}>
                    <Typography variant="body2" fontWeight="bold">{culture.name}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProvinceDetail;
