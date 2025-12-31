import { Card, CardActionArea, Typography, Box } from '@mui/material';

export default function StepCard({
  label,
  selected,
  onClick,
}: any) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        border: selected ? '2px solid #22C55E' : '1px solid #1F2937',
        backgroundColor: '#020617',
      }}
    >
      <CardActionArea onClick={onClick}>
        <Box p={2.5}>
          <Typography
            color={selected ? '#22C55E' : '#E5E7EB'}
            fontWeight={500}
          >
            {label}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}
