// src/pages/SignupPage.tsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Alert } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard'); // redirect after signup
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Phoenix MVP
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Create your account
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          InputProps={{
            startAdornment: <FontAwesomeIcon icon={faUser} style={{ marginRight: 8 }} />,
          }}
          fullWidth
        />

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
          onClick={handleSignup}
          disabled={loading}
          fullWidth
          sx={{ py: 1.5 }}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </Button>

        <Button
          variant="text"
          color="secondary"
          onClick={() => navigate('/')}
        >
          Already have an account? Login
        </Button>
      </Box>
    </Container>
  );
};

export default SignupPage;
