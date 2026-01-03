import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Stack } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from '../components/onboarding/ProgressBar';
import StepCard from '../components/onboarding/StepCard';
import SwipeWrapper from '../components/onboarding/SwipeWrapper';
import { saveOnboarding } from '../lib/saveOnboarding';
import { supabase } from '../supabaseClient';
import EquipmentReviewPage from './onboarding/EquipmentReviewPage';
import TrainingSchedulePage from './onboarding/TrainingSchedulePage';
import RecoverySleepPage from './onboarding/RecoverySleepPage';
import InjuriesPage from './onboarding/InjuriesPage';
import MobilityPage from './onboarding/MobilityPage';
import FinalReviewPage from './onboarding/FinalReviewPage';

// Props to pass to component-based steps
interface ComponentStepProps {
  userId: string | null;
  answers: Record<string, any>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

// Step interface
interface Step {
  key: string;
  type: 'simple' | 'component';
  title?: string;
  options?: string[];
  component?: FC<ComponentStepProps>;
}

// Full onboarding steps
const ONBOARDING_STEPS: Step[] = [
  {
    key: 'goal',
    type: 'simple',
    title: 'What is your top fitness goal?',
    options: ['Lift heavier', 'Build muscle', 'Get lean & defined', 'Lose weight'],
  },
  {
    key: 'routine',
    type: 'simple',
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
    type: 'simple',
    title: 'Strength training experience?',
    options: ['Brand new', '<1 year', '1–2 years', '2–4 years', '4+ years'],
  },
  {
    key: 'location',
    type: 'simple',
    title: 'Where do you usually train?',
    options: ['Large gym', 'Small gym', 'Garage gym', 'At home', 'Without equipment'],
  },
  {
    key: 'equipment_access',
    type: 'simple',
    title: 'What best describes your equipment access?',
    options: ['Full gym machines', 'Free weights available', 'Bands / minimal equipment', 'Bodyweight only'],
  },
  { key: 'equipment_review', type: 'component', component: EquipmentReviewPage },
  { key: 'training_schedule', type: 'component', component: TrainingSchedulePage },
  { key: 'recovery_sleep', type: 'component', component: RecoverySleepPage },
  { key: 'injuries', type: 'component', component: InjuriesPage },
  { key: 'mobility', type: 'component', component: MobilityPage },
  { key: 'review', type: 'component', component: FinalReviewPage },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [userId, setUserId] = useState<string | null>(null);

  const step = ONBOARDING_STEPS[stepIndex];
  const progress = ((stepIndex + 1) / ONBOARDING_STEPS.length) * 100;

  // Get current user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, []);

  // Select option for simple steps
  const select = async (value: string) => {
    if (step.type !== 'simple') return;
    const updated = { ...answers, [step.key]: value };
    setAnswers(updated);
    if (userId) await saveOnboarding(userId, stepIndex, updated);
  };

  // Next step
  const next = async () => {
    if (!userId) return;

    if (step.type === 'simple') {
      await saveOnboarding(userId, stepIndex, answers);
    }

    if (stepIndex < ONBOARDING_STEPS.length - 1) {
      setStepIndex((s) => s + 1);
    }
  };

  // Previous step
  const prev = () => setStepIndex((s) => Math.max(0, s - 1));

  return (
    <Box
      minHeight="100vh"
      bgcolor="#0F172A"
      px={3}
      py={4}
      sx={{ background: 'radial-gradient(circle at top, #020617, #0F172A)' }}
    >
      {/* Skip Button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          sx={{ color: '#38BDF8' }}
          onClick={() => setStepIndex(stepIndex + 1)}
          disabled={stepIndex >= ONBOARDING_STEPS.length - 1}
        >
          Skip
        </Button>
      </Box>

      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Swipeable Step Wrapper */}
      <SwipeWrapper onNext={next} onPrev={prev}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step.key}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Step Content */}
          {step.type === 'simple' ? (
            <>
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
                {step.options?.map((o) => (
                  <StepCard
                    key={o}
                    label={o}
                    selected={answers[step.key] === o}
                    onClick={() => select(o)}
                  />
                ))}
              </Stack>
            </>
          ) : (
            step.component && (
              <step.component
                userId={userId}
                answers={answers}
                setAnswers={setAnswers}
              />
            )
          )}
          </motion.div>
        </AnimatePresence>
      </SwipeWrapper>

      {/* Navigation Buttons */}
      {step.type === 'simple' && (
        <Box mt={6} display="flex" justifyContent="space-between">
          <Button onClick={prev} disabled={stepIndex === 0} sx={{ color: '#38BDF8' }}>
            Back
          </Button>
          <Button
            variant="contained"
            disabled={step.type === 'simple' && !answers[step.key]}
            onClick={next}
            sx={{ bgcolor: '#22C55E', color: '#020617' }}
          >
            {stepIndex === ONBOARDING_STEPS.length - 1 ? 'Continue' : 'Next'}
          </Button>
        </Box>
      )}
    </Box>
  );
}
