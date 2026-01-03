import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Stack, Slider, Chip } from '@mui/material';
import { saveOnboarding } from '../../lib/saveOnboarding';

const JOINTS = ['Shoulders', 'Hips', 'Knees', 'Ankles', 'Wrists', 'Neck'];
const STRETCHING_FREQUENCY = ['Never', '1–2 times/week', '3–4 times/week', 'Daily'];
const FLEXIBILITY_GOALS = ['Increase range of motion', 'Improve posture', 'Prevent injuries', 'Perform specific exercises'];

interface ComponentStepProps {
  userId: string | null; // allow null
  answers: Record<string, any>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}


export default function MobilityPage({ userId, answers, setAnswers }: ComponentStepProps) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    mobility: answers.mobility?.mobility || {} as Record<string, number>, // joint => mobility 1–10
    stretching: answers.mobility?.stretching || '',
    flexibilityGoals: answers.mobility?.flexibilityGoals || [] as string[],
  });

  const toggleGoal = (goal: string) => {
    setData((prev) => {
      const exists = prev.flexibilityGoals.includes(goal);
      return {
        ...prev,
        flexibilityGoals: exists
          ? prev.flexibilityGoals.filter((g: string) => g !== goal)
          : [...prev.flexibilityGoals, goal],
      };
    });
  };

const next = async () => {
  if (!userId) return;

  const updatedAnswers = { ...answers, mobility: data };
  setAnswers(updatedAnswers);

  // Save ONLY
  await saveOnboarding(userId, 10, updatedAnswers);

  // 🚫 no navigate here
};

const prev = () => {
  // 🚫 no navigate here
};

  return (
    <Box minHeight="100vh" px={{ xs: 2, md: 4 }} py={4} bgcolor="#0F172A"
      sx={{ background: 'radial-gradient(circle at top, #020617, #0F172A)' }}
    >
      <Typography variant="h4" fontWeight={700} color="#E5E7EB" mb={4}>
        Mobility & Flexibility
      </Typography>

      <Stack spacing={6}>
        {/* Joint Mobility Sliders */}
        <Box>
          <Typography color="#CBD5F5" mb={1}>
            Rate your current joint mobility (1 = limited, 10 = excellent)
          </Typography>
          <Stack spacing={3}>
            {JOINTS.map((joint) => (
              <Box key={joint}>
                <Typography color="#38BDF8" mb={0.5}>{joint}</Typography>
                <Slider
                  min={1} max={10} value={data.mobility[joint] || 5}
                  onChange={(_, v) => setData(prev => ({
                    ...prev,
                    mobility: { ...prev.mobility, [joint]: v },
                  }))}
                  valueLabelDisplay="auto"
                  sx={{ color: '#22C55E' }}
                />
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Stretching Frequency */}
        <Box>
          <Typography color="#CBD5F5" mb={1}>How often do you stretch?</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {STRETCHING_FREQUENCY.map((freq) => (
              <Chip
                key={freq} label={freq} clickable
                onClick={() => setData(prev => ({ ...prev, stretching: freq }))}
                sx={{
                  mb: 1,
                  bgcolor: data.stretching === freq ? '#22C55E' : '#1F2937',
                  color: '#E5E7EB',
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Flexibility Goals */}
        <Box>
          <Typography color="#CBD5F5" mb={1}>Flexibility goals (select all that apply)</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {FLEXIBILITY_GOALS.map((goal) => (
              <Chip
                key={goal} label={goal} clickable
                onClick={() => toggleGoal(goal)}
                sx={{
                  mb: 1,
                  bgcolor: data.flexibilityGoals.includes(goal) ? '#22C55E' : '#1F2937',
                  color: '#E5E7EB',
                }}
              />
            ))}
          </Stack>
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
