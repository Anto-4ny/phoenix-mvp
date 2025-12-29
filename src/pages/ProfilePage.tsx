// src/pages/ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  Alert,
  Grid,
} from '@mui/material';
import { supabase } from '../supabaseClient';
import DashboardLayout from '../layouts/DashboardLayout';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    age: '',
    height: '',
    weight: '',
    goal: '',
    activityLevel: '',
    diet: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile data from auth.users table
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // For now, using auth.users metadata to store profile info
      const { data, error } = await supabase
        .from('users') // replace with your login/signup table if custom
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        setProfile({
          fullName: data.full_name || '',
          age: data.age?.toString() || '',
          height: data.height_cm?.toString() || '',
          weight: data.weight_kg?.toString() || '',
          goal: data.goal || '',
          activityLevel: data.activity_level || '',
          diet: data.dietary_preference || '',
        });
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError('User not authenticated.');
      setLoading(false);
      return;
    }

    // Upsert data into your login/signup table (users)
    const { error } = await supabase.from('users').upsert({
      id: user.id,
      full_name: profile.fullName,
      age: Number(profile.age),
      height_cm: Number(profile.height),
      weight_kg: Number(profile.weight),
      goal: profile.goal,
      activity_level: profile.activityLevel,
      dietary_preference: profile.diet,
    });

    setLoading(false);
    if (error) setError(error.message);
    else setSuccess(true);
  };

  return (
    <DashboardLayout>
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          bgcolor: '#0f172a',
          minHeight: '100vh',
          color: '#e5e7eb',
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#22c55e"
          mb={3}
          sx={{ fontFamily: 'Montserrat, Poppins' }}
        >
          User Profile
        </Typography>

        <Paper
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 3,
            maxWidth: 900,
            mx: 'auto',
            bgcolor: '#1e293b',
          }}
        >
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Profile saved successfully!
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Full Name"
                variant="filled"
                fullWidth
                value={profile.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                InputProps={{ sx: { color: '#e5e7eb', bgcolor: '#0f172a' } }}
                InputLabelProps={{ sx: { color: '#38bdf8' } }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Age"
                type="number"
                variant="filled"
                fullWidth
                value={profile.age}
                onChange={(e) => handleChange('age', e.target.value)}
                InputProps={{ sx: { color: '#e5e7eb', bgcolor: '#0f172a' } }}
                InputLabelProps={{ sx: { color: '#38bdf8' } }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Height (cm)"
                type="number"
                variant="filled"
                fullWidth
                value={profile.height}
                onChange={(e) => handleChange('height', e.target.value)}
                InputProps={{ sx: { color: '#e5e7eb', bgcolor: '#0f172a' } }}
                InputLabelProps={{ sx: { color: '#38bdf8' } }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Weight (kg)"
                type="number"
                variant="filled"
                fullWidth
                value={profile.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                InputProps={{ sx: { color: '#e5e7eb', bgcolor: '#0f172a' } }}
                InputLabelProps={{ sx: { color: '#38bdf8' } }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                label="Fitness Goal"
                variant="filled"
                fullWidth
                value={profile.goal}
                onChange={(e) => handleChange('goal', e.target.value)}
                InputProps={{ sx: { color: '#e5e7eb', bgcolor: '#0f172a' } }}
                InputLabelProps={{ sx: { color: '#38bdf8' } }}
              >
                <MenuItem value="lose_weight">Lose Weight</MenuItem>
                <MenuItem value="build_muscle">Build Muscle</MenuItem>
                <MenuItem value="maintain">Maintain Fitness</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                label="Activity Level"
                variant="filled"
                fullWidth
                value={profile.activityLevel}
                onChange={(e) => handleChange('activityLevel', e.target.value)}
                InputProps={{ sx: { color: '#e5e7eb', bgcolor: '#0f172a' } }}
                InputLabelProps={{ sx: { color: '#38bdf8' } }}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="moderate">Moderate</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                label="Dietary Preference"
                variant="filled"
                fullWidth
                value={profile.diet}
                onChange={(e) => handleChange('diet', e.target.value)}
                InputProps={{ sx: { color: '#e5e7eb', bgcolor: '#0f172a' } }}
                InputLabelProps={{ sx: { color: '#38bdf8' } }}
              >
                <MenuItem value="none">No Preference</MenuItem>
                <MenuItem value="vegetarian">Vegetarian</MenuItem>
                <MenuItem value="vegan">Vegan</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
                sx={{
                  background: 'linear-gradient(90deg, #22c55e, #16a34a)',
                  px: 5,
                  py: 1.8,
                  fontWeight: 700,
                }}
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </DashboardLayout>
  );
};

export default ProfilePage;
