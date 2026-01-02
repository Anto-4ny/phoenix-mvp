import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  Slider,
  Chip,
  TextField,
} from '@mui/material';
import { supabase } from '../../supabaseClient';
import { saveOnboarding } from '../../lib/saveOnboarding';

const INJURIES = [
  'Lower back',
  'Knee',
  'Shoulder',
  'Elbow',
  'Wrist',
  'Neck',
  'Hip',
  'Ankle',
  'Other',
];

export default function InjuriesPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [data, setData] = useState({
    injuries: [] as string[],
    pain_level: 5,
    limitations: '' as string,
  });

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: auth }) => {
      if (!auth.user) return;
      setUserId(auth.user.id);

      const { data: saved } = await supabase
        .from('profiles')
        .select('injuries')
        .eq('user_id', auth.user.id)
        .single();

      if (saved?.injuries) setData(saved.injuries);
    });
  }, []);

  const toggleInjury = (injury: string) => {
    setData((prev) => {
      const exists = prev.injuries.includes(injury);
      return {
        ...prev,
        injuries: exists
          ? prev.injuries.filter((i) => i !== injury)
          : [...prev.injuries, injury],
      };
    });
  };

  const next = async () => {
    if (!userId) return;
    await saveOnboarding(userId, 9, { injuries: data });
    window.location.href = '/onboarding/mobility'; // next step
  };

  const prev = () => {
    window.location.href = '/onboarding/recovery-sleep';
  };

  return (
    <Box
      minHeight="100vh"
      px={3}
      py={4}
      bgcolor="#0F172A"
      sx={{ background: 'radial-gradient(circle at top, #020617, #0F172A)' }}
    >
      <Typography variant="h4" fontWeight={700} color="#E5E7EB" mb={4}>
        Injuries & Limitations
      </Typography>

      <Stack spacing={5}>
        {/* Select Injuries */}
        <Box>
          <Typography color="#CBD5F5" mb={1}>
            Select any injuries or chronic pain areas
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {INJURIES.map((inj) => (
              <Chip
                key={inj}
                label={inj}
                clickable
                color={data.injuries.includes(inj) ? 'success' : 'default'}
                onClick={() => toggleInjury(inj)}
                sx={{
                  mb: 1,
                  bgcolor: data.injuries.includes(inj)
                    ? '#22C55E'
                    : '#1F2937',
                  color: '#E5E7EB',
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Pain Level */}
        <Box>
          <Typography color="#CBD5F5" mb={1}>
            Pain level (1 = minimal, 10 = severe)
          </Typography>
          <Slider
            min={1}
            max={10}
            value={data.pain_level}
            onChange={(_, v) => setData((prev) => ({ ...prev, pain_level: v }))}
            valueLabelDisplay="auto"
            sx={{ color: '#38BDF8' }}
          />
        </Box>

        {/* Limitations Text */}
        <Box>
          <Typography color="#CBD5F5" mb={1}>
            Other limitations or notes
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="E.g., cannot perform overhead lifts, need low-impact exercises"
            value={data.limitations}
            onChange={(e) =>
              setData((prev) => ({ ...prev, limitations: e.target.value }))
            }
            InputProps={{
              sx: {
                color: '#E5E7EB',
                bgcolor: '#1F2937',
              },
            }}
            InputLabelProps={{ sx: { color: '#38BDF8' } }}
          />
        </Box>
      </Stack>

      {/* Navigation */}
      <Box mt={6} display="flex" justifyContent="space-between">
        <Button onClick={prev}>Back</Button>
        <Button
          variant="contained"
          onClick={next}
          sx={{ bgcolor: '#22C55E', color: '#020617', fontWeight: 700 }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}
