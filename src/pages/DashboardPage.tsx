// src/pages/DashboardPage.tsx
import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const workoutData = [
  { day: 'Mon', calories: 400 },
  { day: 'Tue', calories: 500 },
  { day: 'Wed', calories: 300 },
  { day: 'Thu', calories: 450 },
  { day: 'Fri', calories: 600 },
  { day: 'Sat', calories: 200 },
  { day: 'Sun', calories: 300 },
];

const nutritionData = [
  { day: 'Mon', protein: 50 },
  { day: 'Tue', protein: 60 },
  { day: 'Wed', protein: 55 },
  { day: 'Thu', protein: 70 },
  { day: 'Fri', protein: 65 },
  { day: 'Sat', protein: 40 },
  { day: 'Sun', protein: 50 },
];

const DashboardPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" mb={3}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Workout Overview */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Workout Overview
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={workoutData}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="calories" stroke="#1E3A8A" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Nutrition Overview */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Nutrition Overview
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={nutritionData}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="protein" stroke="#000000" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Progress Summary */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Weekly Progress
            </Typography>
            <Typography variant="body1">
              You have completed 4/5 planned workouts this week and met 80% of your protein
              intake goals.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
