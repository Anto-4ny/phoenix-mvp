import { Paper, Typography } from '@mui/material';

const AIInsight = ({ text }: { text: string }) => (
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
    <Typography color="#cbd5f5">{text}</Typography>
  </Paper>
);

export default AIInsight;
