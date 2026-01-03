import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Stack } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from '../components/onboarding/ProgressBar';
import StepCard from '../components/onboarding/StepCard';
import SwipeWrapper from '../components/onboarding/SwipeWrapper';
import { saveOnboarding } from '../lib/saveOnboarding';
import { supabase } from '../supabaseClient';

const steps = [
  {
    key: 'goal',
    title: 'What is your top fitness goal?',
    options: ['Lift heavier', 'Build muscle', 'Get lean & defined', 'Lose weight'],
  },
  {
    key: 'routine',
    title: 'Your current training routine?',
    options: [
      'Never consistent',
      'Struggle with consistency',
      'Returning from a break',
      'Train regularly',
    ],
  },
  {
    key: 'experience',
    title: 'Strength training experience?',
    options: ['Brand new', '<1 year', '1–2 years', '2–4 years', '4+ years'],
  },
  {
    key: 'location',
    title: 'Where do you usually train?',
    options: [
      'Large gym',
      'Small gym',
      'Garage gym',
      'At home',
      'Without equipment',
    ],
  },
  {
    key: 'equipment_access',
    title: 'What best describes your equipment access?',
    options: [
      'Full gym machines',
      'Free weights available',
      'Bands / minimal equipment',
      'Bodyweight only',
    ],
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [userId, setUserId] = useState<string | null>(null);

  const step = steps[stepIndex];
  const progress = ((stepIndex + 1) / steps.length) * 100;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, []);

  const select = async (value: string) => {
    const updated = { ...answers, [step.key]: value };
    setAnswers(updated);

    if (userId) await saveOnboarding(userId, stepIndex, updated);
  };
const isLastStep = stepIndex === steps.length - 1;

const next = async () => {
  if (!userId) return;

  // Save current step
  await saveOnboarding(userId, stepIndex + 1, answers);

  if (isLastStep) {
    // 🚀 Go to full equipment review page
    navigate('/onboarding/equipment-review', { replace: true });
    return;
  }

  setStepIndex((s) => s + 1);
};


  const prev = () => setStepIndex((s) => Math.max(0, s - 1));

  return (
<Box
  minHeight="100vh"
  bgcolor="#0F172A"
  px={3}
  py={4}
  sx={{
    background: 'radial-gradient(circle at top, #020617, #0F172A)',
  }}
>
  {/* Skip Button */}
  <Box display="flex" justifyContent="flex-end" mb={2}>
    <Button
      sx={{ color: '#38BDF8' }}
      onClick={() => {
        // Skip current onboarding and go to equipment review page
        window.location.href = '/onboarding/equipment-review';
      }}
    >
      Skip
    </Button>
  </Box>

  <ProgressBar progress={progress} />

  <SwipeWrapper onNext={next} onPrev={prev}>
    <AnimatePresence mode="wait">
      <motion.div
        key={step.key}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Typography
          variant="h4"
          mt={6}
          mb={4}
          fontWeight={700}
          color="#E5E7EB"
        >
          {step.title}
        </Typography>

        <Stack spacing={2}>
          {step.options.map((o) => (
            <StepCard
              key={o}
              label={o}
              selected={answers[step.key] === o}
              onClick={() => select(o)}
            />
          ))}
        </Stack>
      </motion.div>
    </AnimatePresence>
  </SwipeWrapper>

  {/* Navigation Buttons */}
  <Box mt={6} display="flex" justifyContent="space-between">
    <Button
      onClick={prev}
      disabled={stepIndex === 0}
      sx={{ color: '#38BDF8' }}
    >
      Back
    </Button>

    <Button
      variant="contained"
      disabled={!answers[step.key]}
      onClick={next}
      sx={{ bgcolor: '#22C55E', color: '#020617' }}
    >
      {isLastStep ? 'Finish' : 'Next'}
    </Button>
  </Box>
</Box>
  );
}
