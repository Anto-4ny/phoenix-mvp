import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Stack,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { supabase } from '../../supabaseClient';
import { saveOnboarding } from '../../lib/saveOnboarding';

/* -------------------- SCORE LOGIC -------------------- */
const calculateRecoveryScore = (d: any) => {
  const sleepScore = Math.min(
    30,
    Math.max(0, ((d.sleep_hours - 4) / 6) * 30)
  );

  const sleepQualityMap: any = {
    Poor: 5,
    Fair: 12,
    Good: 18,
    Excellent: 25,
  };

  const recoveryMap: any = {
    Poor: 5,
    Average: 12,
    Good: 16,
    Elite: 20,
  };

  const stressScore = ((10 - d.stress_level) / 9) * 15;

  const willingnessMap: any = {
    Yes: 10,
    Somewhat: 6,
    'Not a priority': 2,
  };

  return Math.round(
    sleepScore +
      sleepQualityMap[d.sleep_quality] +
      recoveryMap[d.recovery_capacity] +
      stressScore +
      willingnessMap[d.improve_sleep]
  );
};

const getReadiness = (score: number) => {
  if (score >= 85) return { label: 'Optimal', color: '#22C55E' };
  if (score >= 70) return { label: 'Good', color: '#EAB308' };
  if (score >= 55) return { label: 'Moderate', color: '#F97316' };
  return { label: 'Compromised', color: '#EF4444' };
};

/* -------------------- COMPONENT -------------------- */
export default function RecoverySleepPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [data, setData] = useState({
    sleep_hours: 7,
    sleep_quality: 'Good',
    recovery_capacity: 'Average',
    stress_level: 5,
    improve_sleep: 'Yes',
  });

useEffect(() => {
  supabase.auth.getUser().then(async ({ data: auth }) => {
    if (!auth.user) return;
    setUserId(auth.user.id);

    const { data: saved } = await supabase
      .from('profiles')
      .select('onboarding_data')
      .eq('id', auth.user.id)
      .single();

    if (saved?.onboarding_data?.recovery_sleep) {
      setData(saved.onboarding_data.recovery_sleep);
    }
  });
}, []);

  const update = (key: string, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  /* 🔥 LIVE SCORE */
  const recoveryScore = useMemo(
    () => calculateRecoveryScore(data),
    [data]
  );

  const readiness = getReadiness(recoveryScore);

const next = async () => {
  if (!userId) return;

  await saveOnboarding(userId, 8, {
    recovery_sleep: {
      ...data,
      recovery_score: recoveryScore,
      readiness_level: readiness.label,
    },
  });

  navigate('/onboarding/injuries', { replace: true });
};

  const prev = () => {
    navigate('/onboarding/training-schedule', { replace: true });
  };

  return (
    <Box
      minHeight="100vh"
      px={3}
      py={4}
      bgcolor="#0F172A"
      sx={{
        background: 'radial-gradient(circle at top, #020617, #0F172A)',
      }}
    >
      <Typography variant="h4" fontWeight={700} color="#E5E7EB" mb={4}>
        Recovery & Sleep
      </Typography>

      <Stack spacing={5}>
        {/* Sleep Hours */}
        <Box>
          <Typography color="#CBD5F5" mb={1}>
            Average sleep per night (hours)
          </Typography>
          <Slider
            min={4}
            max={10}
            step={0.5}
            value={data.sleep_hours}
            onChange={(_, v) => update('sleep_hours', v)}
            valueLabelDisplay="auto"
            sx={{ color: '#22C55E' }}
          />
        </Box>

        {/* Sleep Quality */}
        <Box>
          <Typography color="#CBD5F5" mb={1}>
            Sleep quality
          </Typography>
          <ToggleButtonGroup
            fullWidth
            value={data.sleep_quality}
            exclusive
            onChange={(_, v) => v && update('sleep_quality', v)}
          >
            {['Poor', 'Fair', 'Good', 'Excellent'].map((o) => (
              <ToggleButton key={o} value={o}>
                {o}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Recovery Capacity */}
        <Box>
          <Typography color="#CBD5F5" mb={1}>
            How well do you recover between workouts?
          </Typography>
          <ToggleButtonGroup
            fullWidth
            value={data.recovery_capacity}
            exclusive
            onChange={(_, v) => v && update('recovery_capacity', v)}
          >
            {['Poor', 'Average', 'Good', 'Elite'].map((o) => (
              <ToggleButton key={o} value={o}>
                {o}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Stress */}
        <Box>
          <Typography color="#CBD5F5" mb={1}>
            Daily stress level
          </Typography>
          <Slider
            min={1}
            max={10}
            value={data.stress_level}
            onChange={(_, v) => update('stress_level', v)}
            valueLabelDisplay="auto"
            sx={{ color: '#38BDF8' }}
          />
        </Box>

        {/* Improve Sleep */}
        <Box>
          <Typography color="#CBD5F5" mb={1}>
            Are you willing to improve sleep habits?
          </Typography>
          <ToggleButtonGroup
            fullWidth
            value={data.improve_sleep}
            exclusive
            onChange={(_, v) => v && update('improve_sleep', v)}
          >
            {['Yes', 'Somewhat', 'Not a priority'].map((o) => (
              <ToggleButton key={o} value={o}>
                {o}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Stack>

      {/* 🧠 READINESS SCORE */}
      <Box
        mt={6}
        p={3}
        borderRadius={3}
        bgcolor="#020617"
        border={`1px solid ${readiness.color}`}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          color={readiness.color}
        >
          Recovery Readiness
        </Typography>

        <Typography
          variant="h3"
          fontWeight={900}
          color={readiness.color}
        >
          {recoveryScore}/100
        </Typography>

        <Typography color="#94A3B8">
          Status: <strong>{readiness.label}</strong>
        </Typography>

        <Typography color="#64748B" fontSize={14} mt={1}>
          This score helps tailor your training volume, intensity,
          recovery days, and deload timing.
        </Typography>
      </Box>

      {/* Navigation */}
      <Box mt={6} display="flex" justifyContent="space-between">
        <Button onClick={prev}>Back</Button>
        <Button
          variant="contained"
          onClick={next}
          sx={{
            bgcolor: '#22C55E',
            color: '#020617',
            fontWeight: 700,
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}
