import React, { useState } from "react";
import { Container, Card, CardContent, Typography, Button, Radio, RadioGroup, FormControlLabel, Modal, Box, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";

const questions = [
  { question: "Apa ibu kota Indonesia?", options: ["Jakarta", "Surabaya", "Bandung", "Medan"], answer: "Jakarta" },
  { question: "Suku terbesar di Indonesia adalah?", options: ["Batak", "Sunda", "Jawa", "Dayak"], answer: "Jawa" },
  { question: "Pulau terbesar di Indonesia adalah?", options: ["Sumatera", "Jawa", "Sulawesi", "Kalimantan"], answer: "Kalimantan" },
  { question: "Rumah adat Tongkonan berasal dari?", options: ["Toraja", "Minangkabau", "Betawi", "Bugis"], answer: "Toraja" },
  { question: "Tari Saman berasal dari?", options: ["Jawa Tengah", "Bali", "Aceh", "Sumatera Barat"], answer: "Aceh" },
  { question: "Alat musik Angklung berasal dari?", options: ["Bali", "Jawa Barat", "Sumatera Utara", "Papua"], answer: "Jawa Barat" },
  { question: "Bahasa resmi Indonesia adalah?", options: ["Bahasa Jawa", "Bahasa Indonesia", "Bahasa Melayu", "Bahasa Sunda"], answer: "Bahasa Indonesia" },
  { question: "Hari Kemerdekaan Indonesia diperingati setiap?", options: ["17 Agustus", "20 Mei", "1 Juni", "28 Oktober"], answer: "17 Agustus" },
  { question: "Gunung tertinggi di Indonesia adalah?", options: ["Merapi", "Bromo", "Semeru", "Puncak Jaya"], answer: "Puncak Jaya" },
  { question: "Candi Borobudur terletak di provinsi?", options: ["Jawa Barat", "Jawa Tengah", "Bali", "Yogyakarta"], answer: "Jawa Tengah" }
];

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [open, setOpen] = useState(false);
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleChange = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnswers({});
    setScore(null);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 2, pb: 9 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Typography variant="h4" gutterBottom align="center">Kuis Keanekaragaman Indonesia</Typography>

        <LinearProgress variant="determinate" value={progress} sx={{ mb: 2, height: 8, borderRadius: 2 }} />

        {questions.map((q, index) => (
          <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card sx={{ mb: 2, p: 1 }}>
              <CardContent>
                <Typography variant="h6">{q.question}</Typography>
                <RadioGroup value={answers[index] || ""} onChange={(e) => handleChange(index, e.target.value)}>
                  {q.options.map((option, i) => (
                    <FormControlLabel key={i} value={option} control={<Radio />} label={option} />
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2, width: "100%" }}>
          Submit
        </Button>

        <Modal open={open} onClose={handleClose}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 320, bgcolor: 'background.paper', boxShadow: 24, p: 4, textAlign: 'center', borderRadius: 3 }}>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
              <Typography variant="h5">Skor Anda</Typography>
              <Typography variant="h4" color="primary" sx={{ mt: 2 }}>{score} / {totalQuestions}</Typography>
              <Button variant="contained" color="secondary" onClick={handleClose} sx={{ mt: 2 }}>Tutup</Button>
            </motion.div>
          </Box>
        </Modal>
      </motion.div>
    </Container>
  );
};

export default Quiz;
