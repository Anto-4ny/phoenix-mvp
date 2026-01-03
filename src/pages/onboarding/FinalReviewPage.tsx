import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Stack, Card, CardContent, Chip } from '@mui/material';
import { supabase } from '../../supabaseClient';
import { saveOnboarding } from '../../lib/saveOnboarding';

export default function FinalReviewPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;

      setUserId(data.user.id);

      // Load onboarding data once
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_data')
        .eq('id', data.user.id)
        .single();

      if (profile?.onboarding_data) {
        setAnswers(profile.onboarding_data);
      }
    });
  }, []);

  // Edit a specific step
  const editStep = (key: string) => {
    const routes: Record<string, string> = {
      goal: '/onboarding',
      routine: '/onboarding',
      experience: '/onboarding',
      location: '/onboarding',
      equipment_access: '/onboarding',
      selected_equipment: '/onboarding/equipment-review',
      training_schedule: '/onboarding/training-schedule',
      recovery_sleep: '/onboarding/recovery-sleep',
      injuries: '/onboarding/injuries',
      mobility: '/onboarding/mobility',
    };

    const route = routes[key];
    if (route) navigate(route);
  };

  // Save any changes immediately if needed
  const updateAnswer = async (key: string, value: any) => {
    if (!userId) return;
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    await saveOnboarding(userId, 999, updated); // 999 = final step
  };

  // Finish onboarding
  const finish = async () => {
    if (!userId) return;

    await supabase
      .from('profiles')
      .update({
        onboarding_completed: true,
        onboarding_step: 999,
      })
      .eq('id', userId);

    navigate('/subscription', { replace: true });
  };

  // Render nested answers nicely
  const renderAnswer = (value: any) => {
    if (Array.isArray(value)) {
      return (
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {value.map((v) => (
            <Chip key={v} label={v} sx={{ bgcolor: '#22C55E', color: '#020617' }} />
          ))}
        </Stack>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <Stack spacing={1}>
          {Object.entries(value).map(([k, v]: any) => (
            <Box key={k}>
              <Typography fontSize={13} color="#94A3B8">
                {k.replace(/_/g, ' ')}
              </Typography>
              {renderAnswer(v)}
            </Box>
          ))}
        </Stack>
      );
    }

    return <Typography>{String(value)}</Typography>;
  };

  return (
    <Box minHeight="100vh" px={3} py={4} bgcolor="#0F172A" sx={{ background: 'radial-gradient(circle at top, #020617, #0F172A)' }}>
      <Typography variant="h4" fontWeight={800} color="#E5E7EB" mb={4}>
        Final Onboarding Review
      </Typography>

      <Stack spacing={3}>
        {Object.entries(answers).map(([key, value]) => (
          <Card key={key} sx={{ bgcolor: '#1E293B', color: '#E5E7EB' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight={700} color="#22C55E">
                  {key.replace(/_/g, ' ').toUpperCase()}
                </Typography>
                <Button size="small" sx={{ color: '#38BDF8' }} onClick={() => editStep(key)}>
                  Edit
                </Button>
              </Box>
              <Box mt={2}>{renderAnswer(value)}</Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Box mt={6} display="flex" justifyContent="center">
        <Button
          variant="contained"
          onClick={finish}
          sx={{ bgcolor: '#22C55E', color: '#020617', px: 6, py: 1.8, fontWeight: 700 }}
        >
          Confirm and complete the onboarding
        </Button>
      </Box>
    </Box>
  );
}
