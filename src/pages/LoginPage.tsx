// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Alert } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard'); // redirect after successful login
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Phoenix MVP
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Login to your account
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: 8 }} />,
          }}
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: <FontAwesomeIcon icon={faLock} style={{ marginRight: 8 }} />,
          }}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={loading}
          fullWidth
          sx={{ py: 1.5 }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        <Button
          variant="text"
          color="secondary"
          onClick={() => navigate('/signup')}
        >
          Don’t have an account? Sign up
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
