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
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccessMsg('Login successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1000);
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
      redirectTo: `${window.location.origin}/reset-password`, // implement this page
    });
    if (error) setError(error.message);
    else setSuccessMsg('Password reset email sent.');
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 8,
        mb: 8,
        bgcolor: 'white',
        p: 4,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Body-building App
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Login to your account
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

      <Box display="flex" flexDirection="column" gap={2}>
        {/* Email Input */}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faEnvelope} color="#1976d2" />
              </InputAdornment>
            ),
          }}
          fullWidth
        />

        {/* Password Input with toggler */}
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faLock} color="#1976d2" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordToggle} edge="end">
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
        />

        {/* Forgot Password */}
        <Box textAlign="right">
          <Link
            component="button"
            variant="body2"
            onClick={handleForgotPassword}
            sx={{ fontWeight: 500 }}
          >
            Forgot Password?
          </Link>
        </Box>

        {/* Login Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={loading}
          fullWidth
          sx={{ py: 1.5, mt: 1 }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        {/* Signup Redirect */}
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate('/signup')}
        >
          Don’t have an account? Sign up
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;

