import Grid from '@mui/material/Grid';
import StatCard from './StatCard';
import { DashboardStats } from '../../types/dashboard';

const StatsGrid = ({ stats }: { stats: DashboardStats }) => (
  <Grid container spacing={3} mb={3}>
    <Grid size={{ xs: 12, md: 3 }}>
      <StatCard title="Weekly Workouts" value={stats.weeklyWorkouts} />
    </Grid>
    <Grid size={{ xs: 12, md: 3 }}>
      <StatCard title="Avg Protein Intake" value={stats.avgProtein} />
    </Grid>
    <Grid size={{ xs: 12, md: 3 }}>
      <StatCard title="Goal" value={stats.goal} />
    </Grid>
    <Grid size={{ xs: 12, md: 3 }}>
      <StatCard title="AI Readiness Score" value={stats.readinessScore} />
    </Grid>
  </Grid>
);

export default StatsGrid;
