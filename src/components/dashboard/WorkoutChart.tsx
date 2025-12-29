import { Paper, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { WorkoutData } from '../../types/dashboard';

const WorkoutChart = ({ data }: { data: WorkoutData[] }) => (
  <Paper sx={{ p: 3, bgcolor: '#020617', borderRadius: 3 }}>
    <Typography fontWeight={700} color="#e5e7eb" mb={2}>
      Calories Burned (Workouts)
    </Typography>
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid stroke="#1e293b" />
        <XAxis dataKey="day" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip />
        <Line type="monotone" dataKey="calories" stroke="#38bdf8" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  </Paper>
);

export default WorkoutChart;
