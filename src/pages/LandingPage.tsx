// src/pages/LandingPage.tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

/* ================= IMAGE SET ================= */
const IMAGES = [
  '/hero0.avif',
  '/hero1.jpg',
  '/hero2.avif',
  '/hero3.webp',
  '/hero4.jpg',
  '/hero5.jpg',
  '/hero6.jpg',
  '/hero7.jpg',
];

const shuffleOnce = (arr: string[]) =>
  [...arr].sort(() => Math.random() - 0.5);

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const images = useMemo(() => shuffleOnce(IMAGES), []);
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState<any | null>(null);

useEffect(() => {
  // Get initial user
  supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));

  // Subscribe to auth state changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      clearInterval(interval);
      subscription.unsubscribe();
    };
  }, [images.length]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const ctaRedirect = () => {
    if (user) navigate('/dashboard');
    else navigate('/signup');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0b0b0b',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ================= BACKGROUND SLIDESHOW ================= */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {images.map((img, i) => (
          <Box
            key={img}
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: i === index ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
            }}
          />
        ))}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: isMobile ? 'rgba(0,0,0,0.78)' : 'rgba(0,0,0,0.6)',
          }}
        />
      </Box>

      {/* ================= TOP NAV ================= */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 3,
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h6"
              fontWeight={900}
              sx={{ letterSpacing: 1 }}
            >
              🏋️ Body-Building App
            </Typography>

            {/* Auth Buttons or Profile */}
            <Stack direction="row" spacing={2}>
              {!user ? (
                <>
                  <Button
                    variant="outlined"
                    sx={{ color: '#00e676', borderColor: '#00e676' }}
                    onClick={() => navigate('/')}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: '#2979ff' }}
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  <IconButton onClick={() => navigate('/dashboard')}>
                    <AccountCircleIcon sx={{ color: '#38bdf8' }} fontSize="large" />
                  </IconButton>
                  <Button
                    variant="outlined"
                    sx={{ color: '#ef4444', borderColor: '#ef4444' }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* ================= NEON GLOWS ================= */}
      <Box
        sx={{
          position: 'absolute',
          top: '-120px',
          right: '-120px',
          width: 320,
          height: 320,
          bgcolor: '#00e676',
          filter: 'blur(160px)',
          opacity: 0.35,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-120px',
          left: '-120px',
          width: 320,
          height: 320,
          bgcolor: '#2979ff',
          filter: 'blur(160px)',
          opacity: 0.35,
          zIndex: 1,
        }}
      />

      {/* ================= MAIN CONTENT ================= */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: { md: '1.1fr 0.9fr' },
          alignItems: 'center',
          gap: { xs: 6, md: 8 },
        }}
      >
        {/* LEFT CONTENT */}
        <Box>
          <Typography
            fontWeight={900}
            lineHeight={1.05}
            sx={{
              fontSize: { xs: '2.4rem', sm: '3rem', md: '3.6rem', lg: '4rem' },
              mb: 2,
            }}
          >
            Build Strength.
            <br />
            <Box component="span" sx={{ color: '#00e676' }}>
              Transform Your Body.
            </Box>
          </Typography>

          <Typography color="grey.400" mb={5} sx={{ maxWidth: 620 }}>
            Track workouts, master nutrition, and unlock your full potential with
            a powerful body-building experience built for serious results.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            <Button
              size="large"
              sx={{
                px: 5,
                py: 1.8,
                fontWeight: 800,
                bgcolor: '#e53935',
                boxShadow: '0 0 25px rgba(229,57,53,0.6)',
              }}
              onClick={ctaRedirect}
            >
              Start Your Transformation
            </Button>

            <Button
              size="large"
              sx={{
                px: 5,
                py: 1.8,
                color: '#00e676',
                border: '2px solid #00e676',
              }}
            >
              Explore Features
            </Button>
          </Stack>
        </Box>

        {/* RIGHT IMAGE PANEL (DESKTOP) */}
        {!isMobile && (
          <Box
            sx={{
              position: 'relative',
              height: 500,
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 40px 90px rgba(0,0,0,0.65)',
            }}
          >
            {images.map((img, i) => (
              <Box
                key={img}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: i === index ? 1 : 0,
                  transition: 'opacity 1.5s ease-in-out',
                }}
              />
            ))}

            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, rgba(0,0,0,0.75), transparent)',
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default LandingPage;
