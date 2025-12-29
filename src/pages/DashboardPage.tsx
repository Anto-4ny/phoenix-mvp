import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import DashboardLayout from '../layouts/DashboardLayout';
import { useDashboardData } from '../hooks/useDashboardData';
import StatsGrid from '../components/dashboard/StatsGrid';
import WorkoutChart from '../components/dashboard/WorkoutChart';
import NutritionChart from '../components/dashboard/NutritionChart';
import AIInsight from '../components/dashboard/AIInsight';

const DashboardPage = () => {
  const { data, loading } = useDashboardData();

  if (loading || !data) return null;

  return (
    <DashboardLayout>
      <Typography
        variant="h4"
        fontWeight={800}
        sx={{ color: '#e5e7eb', mb: 3 }}
      >
        Your AI Fitness Overview
      </Typography>

      <StatsGrid stats={data.stats} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <WorkoutChart data={data.workouts} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <NutritionChart data={data.nutrition} />
        </Grid>
      </Grid>

      <AIInsight text={data.aiInsight} />
    </DashboardLayout>
  );
};

export default DashboardPage;
