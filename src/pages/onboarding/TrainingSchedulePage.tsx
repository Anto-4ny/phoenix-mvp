import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Stack, Chip, CircularProgress } from '@mui/material';
import { saveOnboarding } from '../../lib/saveOnboarding';

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

interface ComponentStepProps {
  userId: string | null; // allow null
  answers: Record<string, any>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export default function TrainingSchedulePage({ userId, answers, setAnswers }: ComponentStepProps) {
  const navigate = useNavigate();

  const [daysPerWeek, setDaysPerWeek] = useState<string | null>(answers.training_schedule?.daysPerWeek || null);
  const [duration, setDuration] = useState<string | null>(answers.training_schedule?.duration || null);
  const [preferredDays, setPreferredDays] = useState<string[]>(answers.training_schedule?.preferredDays || []);
  const [timeOfDay, setTimeOfDay] = useState<string | null>(answers.training_schedule?.timeOfDay || null);

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!answers.training_schedule);

  useEffect(() => {
    // If no previous training_schedule, simulate loading
    if (!answers.training_schedule) {
      setLoading(false);
    }
  }, [answers.training_schedule]);

  const toggleDay = (day: string) => {
    const updated = preferredDays.includes(day)
      ? preferredDays.filter(d => d !== day)
      : [...preferredDays, day];
    setPreferredDays(updated);
  };

  const saveAndNext = async () => {
    if (!userId || saving) return;
    setSaving(true);

    try {
      const updatedSchedule = { daysPerWeek, duration, preferredDays, timeOfDay };
      // Update global answers
      const updatedAnswers = { ...answers, training_schedule: updatedSchedule };
      setAnswers(updatedAnswers);

      // Save to backend
      await saveOnboarding(userId, 7, updatedAnswers);

      // Go to next step
      navigate('/onboarding/recovery-sleep', { replace: true });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bgcolor="#0F172A">
        <CircularProgress sx={{ color: '#22C55E' }} />
      </Box>
    );
  }

  return (
    <Box minHeight="100vh" bgcolor="#0F172A" p={3} color="#E5E7EB">
      <Typography variant="h4" fontWeight={800} mb={4}>
        Training Schedule
      </Typography>

      {/* DAYS PER WEEK */}
      <Typography mb={1}>Days per week</Typography>
      <Stack direction="row" spacing={1} mb={3} flexWrap="wrap">
        {['2','3','4','5','6+'].map(d => (
          <Chip
            key={d}
            label={d}
            clickable
            onClick={() => setDaysPerWeek(d)}
            sx={{ bgcolor: daysPerWeek === d ? '#22C55E' : '#020617', color: daysPerWeek === d ? '#020617' : '#E5E7EB' }}
          />
        ))}
      </Stack>

      {/* DURATION */}
      <Typography mb={1}>Workout duration</Typography>
      <Stack direction="row" spacing={1} mb={3} flexWrap="wrap">
        {['30 min','45 min','60 min','75+ min'].map(d => (
          <Chip
            key={d}
            label={d}
            clickable
            onClick={() => setDuration(d)}
            sx={{ bgcolor: duration === d ? '#22C55E' : '#020617', color: duration === d ? '#020617' : '#E5E7EB' }}
          />
        ))}
      </Stack>

      {/* DAYS */}
      <Typography mb={1}>Preferred training days</Typography>
      <Stack direction="row" spacing={1} mb={3} flexWrap="wrap">
        {DAYS.map(d => (
          <Chip
            key={d}
            label={d}
            clickable
            onClick={() => toggleDay(d)}
            sx={{ bgcolor: preferredDays.includes(d) ? '#38BDF8' : '#020617', color: preferredDays.includes(d) ? '#020617' : '#E5E7EB' }}
          />
        ))}
      </Stack>

      {/* TIME */}
      <Typography mb={1}>Time of day</Typography>
      <Stack direction="row" spacing={1} mb={4} flexWrap="wrap">
        {['Morning','Afternoon','Evening','Late night','Varies'].map(t => (
          <Chip
            key={t}
            label={t}
            clickable
            onClick={() => setTimeOfDay(t)}
            sx={{ bgcolor: timeOfDay === t ? '#22C55E' : '#020617', color: timeOfDay === t ? '#020617' : '#E5E7EB' }}
          />
        ))}
      </Stack>

      {/* NAV */}
      <Box display="flex" justifyContent="space-between">
        <Button onClick={() => navigate(-1)} disabled={saving}>Back</Button>
        <Button
          variant="contained"
          sx={{ bgcolor: '#22C55E', color: '#020617' }}
          onClick={saveAndNext}
          disabled={!daysPerWeek || !duration || !timeOfDay || saving}
        >
          {saving ? 'Saving…' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}
