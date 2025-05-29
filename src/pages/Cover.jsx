import { useNavigate, useOutletContext } from "react-router-dom";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import { styled } from '@mui/system';
import budayaImage from "../assets/ilustrasi-budaya.png";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    borderRadius: theme.spacing(3),
    boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
    background: '#ffffffcc',
}));

export default function Cover() {
    const navigate = useNavigate();
    // const { setPlayMusic } = useOutletContext();

    const handleMasuk = () => {
        navigate('/home');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(to bottom, #e3f2fd, #ffffff)',
                px: 2,
                py: 4,
            }}
        >
            <Container maxWidth="sm">
                <StyledPaper elevation={3}>
                    <Box
                        component="img"
                        src={budayaImage}
                        alt="Ilustrasi Budaya Indonesia"
                        sx={{
                            width: '100%',
                            maxWidth: 300,
                            mb: 3,
                            borderRadius: 2,
                        }}
                    />

                    <Typography variant="h4" component="h1" fontWeight="bold" color="primary" gutterBottom>
                        Keragaman Indonesia
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
                        Ayo jelajahi kekayaan budaya Indonesia!
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                        Temukan keindahan suku, bahasa, dan tradisi yang membentuk jati diri bangsa.
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleMasuk}
                        sx={{
                            borderRadius: 8,
                            px: 5,
                            py: 1.5,
                            textTransform: 'none',
                            boxShadow: '0px 3px 6px rgba(0,0,0,0.2)',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                        }}
                    >
                        Masuk
                    </Button>
                </StyledPaper>
            </Container>
        </Box>
    );
}
