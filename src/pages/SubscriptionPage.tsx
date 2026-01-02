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
  Fade,
} from '@mui/material';

export default function SubscriptionPage() {
  const [billing, setBilling] = useState<'yearly' | 'monthly'>('yearly');
  const [reminder, setReminder] = useState(true);

  const price = billing === 'yearly' ? 'Ksh 14,000.00/year' : 'Ksh 1,166.67/month';

  return (
    <Box
      minHeight="100vh"
      px={{ xs: 3, md: 6 }}
      py={{ xs: 6, md: 10 }}
      bgcolor="#0F172A"
      color="#E5E7EB"
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        background: 'radial-gradient(circle at top, #020617, #0F172A)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <Fade in timeout={800}>
        <Stack alignItems="center" mb={6} spacing={1}>
          <Typography
            variant="h3"
            fontWeight={800}
            color="#22C55E"
            textAlign="center"
            sx={{ textShadow: '0px 4px 20px rgba(34,197,94,0.5)' }}
          >
            Try 7 Days for Free
          </Typography>
          <Typography
            variant="h5"
            color="#E5E7EB"
            textAlign="center"
            sx={{ opacity: 0.85 }}
          >
            {price}
          </Typography>
        </Stack>
      </Fade>

      {/* Billing Toggle */}
      <Stack direction="row" spacing={3} mb={6}>
        <Button
          variant={billing === 'yearly' ? 'contained' : 'outlined'}
          sx={{
            bgcolor: billing === 'yearly' ? '#22C55E' : 'transparent',
            color: billing === 'yearly' ? '#020617' : '#38BDF8',
            px: 6,
            py: 2,
            fontWeight: 700,
            borderRadius: 3,
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: billing === 'yearly' ? '#16a34a' : 'rgba(56,189,248,0.1)',
            },
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
            px: 6,
            py: 2,
            fontWeight: 700,
            borderRadius: 3,
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: billing === 'monthly' ? '#16a34a' : 'rgba(56,189,248,0.1)',
            },
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
          borderRadius: 4,
          width: '100%',
          maxWidth: 650,
          mb: 6,
          p: 4,
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          border: '1px solid rgba(56,189,248,0.2)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' },
        }}
      >
        <Stack spacing={4}>
          {[
            {
              title: 'Today',
              desc: 'Unlock your personalised workout program, exercise library, progress tracking and more.',
            },
            {
              title: 'In 3 Days',
              desc: "We'll send you a reminder that your trial is ending soon.",
            },
            {
              title: 'In 7 Days',
              desc: 'Your subscription starts. Cancel anytime before your trial ends to avoid billing.',
            },
          ].map((item) => (
            <Stack key={item.title} spacing={1}>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="#38BDF8"
                sx={{ letterSpacing: 0.5 }}
              >
                {item.title}
              </Typography>
              <Typography sx={{ opacity: 0.85 }}>{item.desc}</Typography>
            </Stack>
          ))}
        </Stack>
      </Card>

      {/* Reminder Toggle */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        mb={6}
        width="100%"
        maxWidth={650}
      >
        <Switch
          checked={reminder}
          onChange={() => setReminder(!reminder)}
          sx={{
            '& .MuiSwitch-thumb': { bgcolor: '#22C55E' },
            '& .Mui-checked': { color: '#22C55E' },
            '& .MuiSwitch-track': { opacity: 0.3 },
          }}
        />
        <Typography sx={{ opacity: 0.85, fontWeight: 500 }}>
          Remind me before my trial ends
        </Typography>
      </Stack>

      {/* CTA */}
      <Button
        variant="contained"
        sx={{
          bgcolor: '#22C55E',
          color: '#020617',
          px: 8,
          py: 2.2,
          fontWeight: 800,
          fontSize: '1.2rem',
          borderRadius: 3,
          boxShadow: '0 8px 20px rgba(34,197,94,0.5)',
          transition: 'all 0.3s ease',
          '&:hover': { bgcolor: '#16a34a', boxShadow: '0 12px 28px rgba(34,197,94,0.6)' },
        }}
        onClick={() => {
          // TODO: Integrate subscription API
          window.location.href = '/dashboard';
        }}
      >
        Start Your Free Trial
      </Button>

      {/* Footer Links */}
      <Stack direction="row" spacing={3} mt={6}>
        <Button sx={{ color: '#38BDF8', textTransform: 'none' }}>Have a subscription?</Button>
        <Divider orientation="vertical" flexItem sx={{ borderColor: '#38BDF8' }} />
        <Button sx={{ color: '#38BDF8', textTransform: 'none' }}>Privacy</Button>
        <Divider orientation="vertical" flexItem sx={{ borderColor: '#38BDF8' }} />
        <Button sx={{ color: '#38BDF8', textTransform: 'none' }}>Terms</Button>
      </Stack>
    </Box>
  );
}
