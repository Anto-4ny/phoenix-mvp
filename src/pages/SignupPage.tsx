// src/pages/SignupPage.tsx
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
import { faEnvelope, faLock, faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    // Basic validation
    if (!fullName || !email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccessMsg('Signup successful! Please check your email to confirm.');
      setTimeout(() => navigate('/dashboard'), 1500);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
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
          Create your account
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

      <Box display="flex" flexDirection="column" gap={2}>
        {/* Full Name */}
        <TextField
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faUser} color="#1976d2" />
              </InputAdornment>
            ),
          }}
          fullWidth
        />

        {/* Email */}
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

        {/* Password with toggle */}
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

        {/* Signup Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignup}
          disabled={loading}
          fullWidth
          sx={{ py: 1.5, mt: 1 }}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </Button>

        {/* Login Redirect */}
        <Box textAlign="center">
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/')}
            sx={{ fontWeight: 500 }}
          >
            Already have an account? Login
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
