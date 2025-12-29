// src/pages/LandingPage.tsx
import React from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0b0b0b',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Overlay (image/video ready) */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(180deg, rgba(0,0,0,0.85), rgba(0,0,0,0.95))',
          zIndex: 1,
        }}
      />

      {/* Neon Glow Accents */}
      <Box
        sx={{
          position: 'absolute',
          top: '-120px',
          right: '-120px',
          width: 300,
          height: 300,
          bgcolor: '#00e676',
          filter: 'blur(160px)',
          opacity: 0.35,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-120px',
          left: '-120px',
          width: 300,
          height: 300,
          bgcolor: '#2979ff',
          filter: 'blur(160px)',
          opacity: 0.35,
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={10}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            letterSpacing={1}
          >
            🏋️ Body-Building App
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              sx={{
                color: '#00e676',
                borderColor: '#00e676',
                '&:hover': {
                  borderColor: '#00c853',
                  bgcolor: 'rgba(0,230,118,0.1)',
                },
              }}
              onClick={() => navigate('/')}
            >
              Login
            </Button>

            <Button
              variant="contained"
              sx={{
                bgcolor: '#2979ff',
                '&:hover': {
                  bgcolor: '#1565c0',
                },
              }}
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </Stack>
        </Box>

        {/* Hero Content */}
        <Box
          sx={{
            maxWidth: 700,
            animation: 'fadeUp 1s ease-out',
          }}
        >
          <Typography
            variant="h2"
            fontWeight={900}
            lineHeight={1.1}
            gutterBottom
          >
            Build Strength.
            <br />
            <Box component="span" sx={{ color: '#00e676' }}>
              Transform Your Body.
            </Box>
          </Typography>

          <Typography
            variant="h6"
            color="grey.400"
            mb={5}
          >
            Track workouts, master nutrition, and unlock your full
            potential with a powerful body-building experience built
            for serious results.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            <Button
              size="large"
              sx={{
                px: 5,
                py: 1.8,
                fontSize: '1rem',
                fontWeight: 'bold',
                bgcolor: '#e53935',
                '&:hover': {
                  bgcolor: '#c62828',
                },
                boxShadow: '0 0 25px rgba(229,57,53,0.6)',
              }}
              onClick={() => navigate('/signup')}
            >
              Start Your Transformation
            </Button>

            <Button
              size="large"
              sx={{
                px: 5,
                py: 1.8,
                fontSize: '1rem',
                color: '#00e676',
                border: '2px solid #00e676',
                '&:hover': {
                  bgcolor: 'rgba(0,230,118,0.15)',
                },
              }}
            >
              Explore Features
            </Button>
          </Stack>
        </Box>
      </Container>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default LandingPage;
