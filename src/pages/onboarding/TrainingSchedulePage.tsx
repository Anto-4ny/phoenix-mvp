import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
} from '@mui/material';
import { supabase } from '../../supabaseClient';

const DAYS = [
  'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'
];

export default function TrainingSchedulePage() {
  const navigate = useNavigate();
  const [daysPerWeek, setDaysPerWeek] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [preferredDays, setPreferredDays] = useState<string[]>([]);
  const [timeOfDay, setTimeOfDay] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, []);

  const toggleDay = (day: string) => {
    setPreferredDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

const saveAndNext = async () => {
  if (!userId) return;

  // 1️⃣ Load existing onboarding data
  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_data')
    .eq('id', userId)
    .single();

  // 2️⃣ Merge + advance step
  await supabase.from('profiles').update({
    onboarding_step: 9, // NEXT step (Recovery & Sleep)
    onboarding_data: {
      ...profile?.onboarding_data,
      training_schedule: {
        daysPerWeek,
        duration,
        preferredDays,
        timeOfDay,
      },
    },
  }).eq('id', userId);

  navigate('/onboarding/recovery-sleep', { replace: true });
};


  return (
    <Box minHeight="100vh" bgcolor="#0F172A" p={3} color="#E5E7EB">
      <Typography variant="h4" fontWeight={800} mb={4}>
        Training Schedule
      </Typography>

      {/* DAYS PER WEEK */}
      <Typography mb={1}>Days per week</Typography>
      <Stack direction="row" spacing={1} mb={3} flexWrap="wrap">
        {['2','3','4','5','6+'].map((d) => (
          <Chip
            key={d}
            label={d}
            clickable
            onClick={() => setDaysPerWeek(d)}
            sx={{
              bgcolor: daysPerWeek === d ? '#22C55E' : '#020617',
              color: daysPerWeek === d ? '#020617' : '#E5E7EB',
            }}
          />
        ))}
      </Stack>

      {/* DURATION */}
      <Typography mb={1}>Workout duration</Typography>
      <Stack direction="row" spacing={1} mb={3} flexWrap="wrap">
        {['30 min','45 min','60 min','75+ min'].map((d) => (
          <Chip
            key={d}
            label={d}
            clickable
            onClick={() => setDuration(d)}
            sx={{
              bgcolor: duration === d ? '#22C55E' : '#020617',
              color: duration === d ? '#020617' : '#E5E7EB',
            }}
          />
        ))}
      </Stack>

      {/* DAYS */}
      <Typography mb={1}>Preferred training days</Typography>
      <Stack direction="row" spacing={1} mb={3} flexWrap="wrap">
        {DAYS.map((d) => (
          <Chip
            key={d}
            label={d}
            clickable
            onClick={() => toggleDay(d)}
            sx={{
              bgcolor: preferredDays.includes(d) ? '#38BDF8' : '#020617',
              color: preferredDays.includes(d) ? '#020617' : '#E5E7EB',
            }}
          />
        ))}
      </Stack>

      {/* TIME */}
      <Typography mb={1}>Time of day</Typography>
      <Stack direction="row" spacing={1} mb={4} flexWrap="wrap">
        {['Morning','Afternoon','Evening','Late night','Varies'].map((t) => (
          <Chip
            key={t}
            label={t}
            clickable
            onClick={() => setTimeOfDay(t)}
            sx={{
              bgcolor: timeOfDay === t ? '#22C55E' : '#020617',
              color: timeOfDay === t ? '#020617' : '#E5E7EB',
            }}
          />
        ))}
      </Stack>

      {/* NAV */}
      <Box display="flex" justifyContent="space-between">
        <Button onClick={() => window.history.back()}>Back</Button>
        <Button
          variant="contained"
          sx={{ bgcolor: '#22C55E', color: '#020617' }}
          onClick={saveAndNext}
          disabled={!daysPerWeek || !duration || !timeOfDay}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
