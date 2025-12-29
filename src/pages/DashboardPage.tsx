// src/pages/DashboardPage.tsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid'; // Grid2 syntax
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import DashboardLayout from '../layouts/DashboardLayout';

const workoutData = [
  { day: 'Mon', calories: 420 },
  { day: 'Tue', calories: 530 },
  { day: 'Wed', calories: 380 },
  { day: 'Thu', calories: 480 },
  { day: 'Fri', calories: 650 },
  { day: 'Sat', calories: 300 },
  { day: 'Sun', calories: 350 },
];

const nutritionData = [
  { day: 'Mon', protein: 120 },
  { day: 'Tue', protein: 135 },
  { day: 'Wed', protein: 125 },
  { day: 'Thu', protein: 150 },
  { day: 'Fri', protein: 145 },
  { day: 'Sat', protein: 100 },
  { day: 'Sun', protein: 120 },
];

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <Paper
    sx={{
      p: 3,
      bgcolor: '#020617',
      borderRadius: 3,
      border: '1px solid rgba(56,189,248,0.15)',
    }}
  >
    <Typography color="#94a3b8" fontSize={14}>
      {title}
    </Typography>
    <Typography fontSize={28} fontWeight={800} color="#22c55e">
      {value}
    </Typography>
  </Paper>
);

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Typography
        variant="h4"
        fontWeight={800}
        sx={{ color: '#e5e7eb', fontFamily: 'Montserrat, Poppins', mb: 3 }}
      >
        Your AI Fitness Overview
      </Typography>

      {/* Stats */}
      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard title="Weekly Workouts" value="4 / 5" />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard title="Avg Protein Intake" value="135g/day" />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard title="Goal" value="Lean Muscle Gain" />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <StatCard title="AI Readiness Score" value="92%" />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, bgcolor: '#020617', borderRadius: 3 }}>
            <Typography fontWeight={700} color="#e5e7eb" mb={2}>
              Calories Burned (Workouts)
            </Typography>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={workoutData}>
                <CartesianGrid stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="calories"
                  stroke="#38bdf8"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, bgcolor: '#020617', borderRadius: 3 }}>
            <Typography fontWeight={700} color="#e5e7eb" mb={2}>
              Protein Intake (Diet Plan)
            </Typography>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={nutritionData}>
                <CartesianGrid stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="protein"
                  stroke="#22c55e"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* AI Insight */}
      <Paper
        sx={{
          mt: 3,
          p: 3,
          bgcolor: '#020617',
          borderRadius: 3,
          borderLeft: '4px solid #22c55e',
        }}
      >
        <Typography fontWeight={700} color="#22c55e" mb={1}>
          AI Coach Insight
        </Typography>
        <Typography color="#cbd5f5">
          Based on your age, body mass, and recent performance, increasing
          protein intake by 10% and prioritizing compound lifts will accelerate
          hypertrophy while minimizing fatigue.
        </Typography>
      </Paper>
    </DashboardLayout>
  );
};

export default DashboardPage;
