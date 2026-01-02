import { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Card,
  CardContent,
  Divider,
  Switch,
} from '@mui/material';

export default function SubscriptionPage() {
  const [billing, setBilling] = useState<'yearly' | 'monthly'>('yearly');
  const [reminder, setReminder] = useState(true);

  const price = billing === 'yearly' ? 'Ksh 14,000.00/year' : 'Ksh 1,166.67/month';

  return (
    <Box
      minHeight="100vh"
      px={{ xs: 3, md: 6 }}
      py={{ xs: 4, md: 6 }}
      bgcolor="#0F172A"
      color="#E5E7EB"
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ background: 'radial-gradient(circle at top, #020617, #0F172A)' }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        fontWeight={700}
        color="#22C55E"
        mb={1.5}
        textAlign="center"
      >
        Try 7 Days for Free
      </Typography>
      <Typography variant="h6" color="#E5E7EB" mb={4} textAlign="center">
        {price}
      </Typography>

      {/* Billing Toggle */}
      <Stack direction="row" spacing={2} mb={4}>
        <Button
          variant={billing === 'yearly' ? 'contained' : 'outlined'}
          sx={{
            bgcolor: billing === 'yearly' ? '#22C55E' : 'transparent',
            color: billing === 'yearly' ? '#020617' : '#38BDF8',
            px: 4,
            py: 1.5,
          }}
          onClick={() => setBilling('yearly')}
        >
          Yearly
        </Button>
        <Button
          variant={billing === 'monthly' ? 'contained' : 'outlined'}
          sx={{
            bgcolor: billing === 'monthly' ? '#22C55E' : 'transparent',
            color: billing === 'monthly' ? '#020617' : '#38BDF8',
            px: 4,
            py: 1.5,
          }}
          onClick={() => setBilling('monthly')}
        >
          Monthly
        </Button>
      </Stack>

      {/* Feature Timeline */}
      <Card
        sx={{
          bgcolor: '#1E293B',
          borderRadius: 3,
          width: '100%',
          maxWidth: 600,
          mb: 4,
          p: 3,
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="subtitle1" fontWeight={700} color="#38BDF8">
              Today
            </Typography>
            <Typography>
              Unlock your personalised workout program, exercise library, progress tracking and more.
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle1" fontWeight={700} color="#38BDF8">
              In 3 Days
            </Typography>
            <Typography>
              We'll send you a reminder that your trial is ending soon.
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle1" fontWeight={700} color="#38BDF8">
              In 7 Days
            </Typography>
            <Typography>
              Your subscription starts. Cancel anytime before your trial ends to not be billed.
            </Typography>
          </Stack>
        </Stack>
      </Card>

      {/* Reminder Toggle */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        mb={4}
        width="100%"
        maxWidth={600}
      >
        <Switch
          checked={reminder}
          onChange={() => setReminder(!reminder)}
          sx={{
            '& .MuiSwitch-thumb': { bgcolor: '#22C55E' },
            '& .Mui-checked': { color: '#22C55E' },
          }}
        />
        <Typography>Remind me before my trial ends</Typography>
      </Stack>

      {/* CTA */}
      <Button
        variant="contained"
        sx={{
          bgcolor: '#22C55E',
          color: '#020617',
          px: 6,
          py: 1.8,
          mb: 2,
          fontWeight: 700,
          borderRadius: 3,
        }}
        onClick={() => {
          // TODO: Integrate subscription API here
          window.location.href = '/dashboard';
        }}
      >
        Start Your Free Trial
      </Button>

      {/* Footer links */}
      <Stack direction="row" spacing={2} mt={2}>
        <Button sx={{ color: '#38BDF8', textTransform: 'none' }}>
          Have a subscription?
        </Button>
        <Divider orientation="vertical" flexItem sx={{ borderColor: '#38BDF8' }} />
        <Button sx={{ color: '#38BDF8', textTransform: 'none' }}>Privacy</Button>
        <Divider orientation="vertical" flexItem sx={{ borderColor: '#38BDF8' }} />
        <Button sx={{ color: '#38BDF8', textTransform: 'none' }}>Terms</Button>
      </Stack>
    </Box>
  );
}
