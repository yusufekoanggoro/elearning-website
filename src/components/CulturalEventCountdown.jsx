import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, CardMedia, LinearProgress, Button } from "@mui/material";

const CulturalEventCountdown = ({ event }) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const eventTime = new Date(event.date).getTime();
    const difference = eventTime - now;

    if (difference <= 0) {
      return null; // Event telah berlangsung
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const eventHasStarted = timeLeft === null;
  const totalDuration = new Date(event.date).getTime() - new Date().getTime();
  const progress = eventHasStarted ? 100 : Math.max(0, (1 - totalDuration / (30 * 24 * 60 * 60 * 1000)) * 100);

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardMedia component="img" height="160" image={event.image} alt={event.name} />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>{event.name}</Typography>
        <Typography variant="body2" color="text.secondary">{event.description}</Typography>

        {eventHasStarted ? (
          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1, color: "red" }}>
            🎉 Event telah berlangsung!
          </Typography>
        ) : (
          <>
            <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
              ⏳ {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ mt: 1, height: 8, borderRadius: 5 }} />
            <Typography variant="caption" align="center" display="block">
              {Math.round(progress)}% menuju event
            </Typography>
          </>
        )}

      </CardContent>
    </Card>
  );
};

export default CulturalEventCountdown;
