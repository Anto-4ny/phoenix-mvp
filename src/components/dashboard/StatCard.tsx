import { Paper, Typography } from '@mui/material';

interface Props {
  title: string;
  value: string;
}

const StatCard = ({ title, value }: Props) => (
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

export default StatCard;
