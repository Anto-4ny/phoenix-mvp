import { useEffect, useState } from 'react';
import { Box, Typography, Stack, Button, Card, CardContent, Chip } from '@mui/material';
import { supabase } from '../../supabaseClient';
import { saveOnboarding } from '../../lib/saveOnboarding';

export default function FinalReviewPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<any>({});

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      setUserId(data.user.id);

      // Fetch saved onboarding data
      const { data: saved } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      if (saved) setAnswers(saved.answers ?? {});
    });
  }, []);

  const editStep = (stepKey: string) => {
    switch (stepKey) {
      case 'goal':
      case 'routine':
      case 'experience':
      case 'location':
      case 'equipment_access':
        window.location.href = '/onboarding';
        break;
      case 'equipment_review':
        window.location.href = '/onboarding/equipment-review';
        break;
      case 'recovery_sleep':
        window.location.href = '/onboarding/recovery-sleep';
        break;
      case 'injuries':
        window.location.href = '/onboarding/injuries';
        break;
      case 'mobility':
        window.location.href = '/onboarding/mobility';
        break;
      default:
        break;
    }
  };

  const finish = async () => {
    if (!userId) return;
    await saveOnboarding(userId, 999, { completed: true, answers });
    // Redirect to dashboard or homepage
    window.location.href = '/dashboard';
  };

  const renderAnswer = (key: string, value: any) => {
    if (Array.isArray(value)) {
      return (
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {value.map((v: string) => (
            <Chip
              key={v}
              label={v}
              sx={{ bgcolor: '#22C55E', color: '#020617' }}
            />
          ))}
        </Stack>
      );
    } else if (typeof value === 'object') {
      // For equipment or complex objects
      return (
        <Stack direction="column" spacing={1}>
          {Object.entries(value).map(([cat, items]: any) => (
            <Box key={cat} mb={1}>
              <Typography fontWeight={700} color="#38BDF8">{cat}</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {Object.keys(items).map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    sx={{ bgcolor: '#22C55E', color: '#020617' }}
                  />
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      );
    } else {
      return <Typography>{value}</Typography>;
    }
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
        Final Onboarding Review
      </Typography>

      <Stack spacing={3}>
        {Object.entries(answers).map(([key, value]: any) => (
          <Card key={key} sx={{ bgcolor: '#1E293B', color: '#E5E7EB' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight={700} color="#22C55E">
                  {key.replace(/_/g, ' ').toUpperCase()}
                </Typography>
                <Button
                  size="small"
                  sx={{ color: '#38BDF8' }}
                  onClick={() => editStep(key)}
                >
                  Edit
                </Button>
              </Box>
              <Box mt={1}>{renderAnswer(key, value)}</Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Box mt={6} display="flex" justifyContent="center">
        <Button
          variant="contained"
          onClick={finish}
          sx={{ bgcolor: '#22C55E', color: '#020617', px: 6, py: 1.8 }}
        >
          Finish Onboarding
        </Button>
      </Box>
    </Box>
  );
}
