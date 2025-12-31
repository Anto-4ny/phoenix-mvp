import { Box } from '@mui/material';

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <Box width="100%" height={6} bgcolor="#020617" borderRadius={10}>
      <Box
        width={`${progress}%`}
        height="100%"
        bgcolor="#22C55E"
        borderRadius={10}
        sx={{ transition: 'width 0.4s ease' }}
      />
    </Box>
  );
}
