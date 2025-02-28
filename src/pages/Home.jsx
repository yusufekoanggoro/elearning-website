import { Box, Typography, Container, Grid } from "@mui/material";
import CulturalEventCountdown from "../components/CulturalEventCountdown";

export default function Home() {
  const events = [
    {
      name: "🎭 Festival Wayang Kulit",
      description: "Pertunjukan Wayang Kulit terbesar di Indonesia.",
      date: "2024-10-15T19:00:00Z",
      image: "https://www.mediarakyat.org/wp-content/uploads/2024/06/Festival-Wayang-Kulit-Internasional-Sukses-Digelar-di-Yogyakarta.jpg"
    },
    {
      name: "🏮 Cap Go Meh",
      description: "Perayaan Cap Go Meh dengan Barongsai dan Lampion.",
      date: "2025-02-24T18:00:00Z",
      image: "https://akcdn.detik.net.id/visual/2019/02/20/1fb4e3a6-7a23-4561-a8bd-16495d54c441_169.jpeg?w=650&q=80"
    },
    {
      name: "🎶 Festival Gamelan",
      description: "Saksikan alunan gamelan khas Indonesia.",
      date: "2025-06-10T17:00:00Z",
      image: "https://img.harianjogja.com/posts/2024/08/11/1184439/ygf.jpg"
    },
    {
      name: "🖌️ Hari Batik Nasional",
      description: "Peringatan Hari Batik dengan pameran kain batik.",
      date: "2025-10-02T08:00:00Z",
      image: "https://awsimages.detik.net.id/community/media/visual/2022/09/29/hari-batik-nasional-2022-sejarah-dan-twibbon-perayaan_169.jpeg?w=700&q=90"
    }
  ];
  const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <Container maxWidth="xs" sx={{ mt: 2, pb: 9 }}>
      <Grid container spacing={2} justifyContent="center">
        {sortedEvents.map((event, index) => (
          <Grid item xs={12} key={index}>
            <CulturalEventCountdown event={event} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
