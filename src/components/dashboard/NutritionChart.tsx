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
import { NutritionData } from '../../types/dashboard';

const NutritionChart = ({ data }: { data: NutritionData[] }) => (
  <Paper sx={{ p: 3, bgcolor: '#020617', borderRadius: 3 }}>
    <Typography fontWeight={700} color="#e5e7eb" mb={2}>
      Protein Intake (Diet Plan)
    </Typography>
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid stroke="#1e293b" />
        <XAxis dataKey="day" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip />
        <Line type="monotone" dataKey="protein" stroke="#22c55e" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  </Paper>
);

export default NutritionChart;
