// src/layouts/DashboardLayout.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Button,
  Stack,
  Avatar,
} from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const drawerWidth = 260;

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Listen to auth changes
useEffect(() => {
  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  getUser();

  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  const drawer = (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        fontWeight={800}
        sx={{
          fontFamily: 'Montserrat, Poppins',
          color: '#22c55e',
          mb: 4,
        }}
      >
        AI Body Pro
      </Typography>

      <Stack spacing={2}>
        {[
          'Dashboard',
          'Workout Plans',
          'Diet & Nutrition',
          'Progress Tracking',
          'AI Coach',
          'Settings',
        ].map((item) => (
          <Typography
            key={item}
            sx={{
              color: '#94a3b8',
              fontWeight: 500,
              cursor: 'pointer',
              '&:hover': { color: '#22c55e' },
            }}
          >
            {item}
          </Typography>
        ))}
      </Stack>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#020617' }}>
      {/* Mobile Hamburger */}
      <IconButton
        onClick={() => setMobileOpen(true)}
        sx={{
          display: { md: 'none' },
          position: 'fixed',
          top: 16,
          left: 16,
          color: '#38bdf8',
          zIndex: 1200,
        }}
      >
        <MenuOpenIcon />
      </IconButton>

      {/* Sidebar Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            bgcolor: '#020617',
            borderRight: '1px solid rgba(56,189,248,0.15)',
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* Sidebar Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            bgcolor: '#020617',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
        {/* Topbar */}
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <SportsGymnasticsIcon sx={{ color: '#38bdf8' }} />
            <Typography color="#e5e7eb" fontWeight={600}>
              Premium AI Body-Building Dashboard
            </Typography>
          </Stack>

          {/* Auth Buttons / Profile */}
          <Stack direction="row" spacing={1} alignItems="center">
            {!user ? (
              <>
                <Button
                  variant="outlined"
                  sx={{ borderColor: '#38bdf8', color: '#38bdf8' }}
                  onClick={() => navigate('/')}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(90deg, #22c55e, #16a34a)',
                    fontWeight: 700,
                  }}
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Avatar
                  sx={{ bgcolor: '#38bdf8', width: 36, height: 36, cursor: 'pointer' }}
                  onClick={() => navigate('/profile')}
                >
                  {user.email?.[0].toUpperCase()}
                </Avatar>
                <Button
                  variant="outlined"
                  sx={{ borderColor: '#ef4444', color: '#ef4444', ml: 1 }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Stack>
        </Box>

        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
