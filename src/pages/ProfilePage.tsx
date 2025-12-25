import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { supabase } from '../supabaseClient';

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

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('profiles').upsert({
      user_id: user.id,
      full_name: profile.fullName,
      age: Number(profile.age),
      height_cm: Number(profile.height),
      weight_kg: Number(profile.weight),
      goal: profile.goal,
      activity_level: profile.activityLevel,
      dietary_preference: profile.diet,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" mb={3}>
        User Profile
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 2, maxWidth: 900 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Profile saved successfully
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
              fullWidth
              value={profile.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Age"
              type="number"
              fullWidth
              value={profile.age}
              onChange={(e) => handleChange('age', e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Height (cm)"
              type="number"
              fullWidth
              value={profile.height}
              onChange={(e) => handleChange('height', e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Weight (kg)"
              type="number"
              fullWidth
              value={profile.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              label="Fitness Goal"
              fullWidth
              value={profile.goal}
              onChange={(e) => handleChange('goal', e.target.value)}
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
              fullWidth
              value={profile.activityLevel}
              onChange={(e) =>
                handleChange('activityLevel', e.target.value)
              }
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
              fullWidth
              value={profile.diet}
              onChange={(e) => handleChange('diet', e.target.value)}
            >
              <MenuItem value="none">No Preference</MenuItem>
              <MenuItem value="vegetarian">Vegetarian</MenuItem>
              <MenuItem value="vegan">Vegan</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={loading}
              sx={{ px: 4, py: 1.5 }}
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
