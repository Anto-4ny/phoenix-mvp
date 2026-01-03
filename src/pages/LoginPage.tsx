// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  InputAdornment,
  IconButton,
  Link,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccessMsg('Login successful! Redirecting...');
      setTimeout(() => navigate('/onboarding'), 1000);
    }
  };

  const ensureProfile = async (userId: string) => {
  const { data } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .maybeSingle();

  if (!data) {
    await supabase.from('profiles').insert({
      id: userId,
      onboarding_data: {},
      onboarding_step: 0,
      onboarding_completed: false,
    });
  }
};

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Enter your email to reset password.');
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) setError(error.message);
    else setSuccessMsg('Password reset email sent.');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(circle at top, #020617 0%, #0f172a 50%, #020617 100%)',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          bgcolor: '#020617',
          p: 4,
          borderRadius: 4,
          border: '1px solid rgba(56,189,248,0.15)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              fontFamily: 'Montserrat, Poppins',
              color: '#22c55e',
              letterSpacing: 1,
            }}
          >
            Body-Building App
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: '#94a3b8', mt: 1 }}
          >
            Login to your account
          </Typography>
        </Box>

        {/* Alerts */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {successMsg && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMsg}
          </Alert>
        )}

        {/* Form */}
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Email */}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    color="#38bdf8"
                  />
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon
                    icon={faLock}
                    color="#38bdf8"
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handlePasswordToggle} edge="end">
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      color="#94a3b8"
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Forgot Password */}
          <Box textAlign="right">
            <Link
              component="button"
              variant="body2"
              onClick={handleForgotPassword}
              sx={{
                color: '#38bdf8',
                fontWeight: 500,
              }}
            >
              Forgot password?
            </Link>
          </Box>

          {/* Login Button */}
          <Button
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
            fullWidth
            sx={{
              mt: 1,
              py: 1.5,
              fontWeight: 700,
              letterSpacing: 1,
              background:
                'linear-gradient(90deg, #22c55e, #16a34a)',
              '&:hover': {
                background:
                  'linear-gradient(90deg, #16a34a, #22c55e)',
              },
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          {/* Signup Redirect */}
          <Box textAlign="center" mt={1}>
            <Link
              component="button"
              onClick={() => navigate('/signup')}
              sx={{
                color: '#94a3b8',
                fontWeight: 500,
              }}
            >
              Don’t have an account?{' '}
              <span style={{ color: '#22c55e' }}>Sign up</span>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;


