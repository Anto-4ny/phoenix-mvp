import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Stack, Slider, Chip, TextField } from '@mui/material';
import { saveOnboarding } from '../../lib/saveOnboarding';

const INJURIES = [
  'Lower back', 'Knee', 'Shoulder', 'Elbow', 'Wrist', 'Neck', 'Hip', 'Ankle', 'Other'
];

interface ComponentStepProps {
  userId: string | null;
  answers: Record<string, any>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  nextStep: () => void;   // ← new
  prevStep: () => void;   // ← new
}

export default function InjuriesPage({ userId, answers, setAnswers, nextStep, prevStep }: ComponentStepProps) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    injuries: answers.injuries?.injuries || [] as string[],
    pain_level: answers.injuries?.pain_level || 5,
    limitations: answers.injuries?.limitations || '',
  });

  const toggleInjury = (injury: string) => {
    setData((prev) => ({
      ...prev,
      injuries: prev.injuries.includes(injury)
        ? prev.injuries.filter((i: string) => i !== injury)
        : [...prev.injuries, injury],
    }));
  };

const next = async () => {
  if (!userId) return;

  const updatedAnswers = { ...answers, injuries: data };
  setAnswers(updatedAnswers);

  // Save ONLY
  await saveOnboarding(userId, 9, updatedAnswers);
  nextStep();
  // 🚫 no navigate here
};

const prev = () => {
  prevStep();
  // 🚫 no navigate here
  // Back navigation is handled by OnboardingPage / SwipeWrapper
};

  return (
    <Box minHeight="100vh" px={3} py={4} bgcolor="#0F172A" sx={{ background: 'radial-gradient(circle at top, #020617, #0F172A)' }}>
      <Typography variant="h4" fontWeight={700} color="#E5E7EB" mb={4}>
        Injuries & Limitations
      </Typography>

      <Stack spacing={5}>
        {/* Select Injuries */}
        <Box>
          <Typography color="#CBD5F5" mb={1}>Select any injuries or chronic pain areas</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {INJURIES.map((inj) => (
              <Chip
                key={inj}
                label={inj}
                clickable
                onClick={() => toggleInjury(inj)}
                sx={{
                  mb: 1,
                  bgcolor: data.injuries.includes(inj) ? '#22C55E' : '#1F2937',
                  color: '#E5E7EB',
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Pain Level */}
        <Box>
          <Typography color="#CBD5F5" mb={1}>Pain level (1 = minimal, 10 = severe)</Typography>
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
          <Typography color="#CBD5F5" mb={1}>Other limitations or notes</Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="E.g., cannot perform overhead lifts, need low-impact exercises"
            value={data.limitations}
            onChange={(e) => setData((prev) => ({ ...prev, limitations: e.target.value }))}
            InputProps={{ sx: { color: '#E5E7EB', bgcolor: '#1F2937' } }}
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
