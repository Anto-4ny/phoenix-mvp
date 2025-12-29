// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#0f172a',
    },
    secondary: {
      main: '#22c55e',
    },
    error: {
      main: '#ef4444',
    },
    info: {
      main: '#38bdf8', // Accent (electric blue)
    },

    background: {
      default: '#0b0b0b',
      paper: '#111827',
    },

    text: {
      primary: '#ffffff',
      secondary: '#9ca3af',
    },
  },

  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',

    h1: {
      fontFamily: 'Montserrat, Poppins, sans-serif',
      fontWeight: 800,
    },
    h2: {
      fontFamily: 'Montserrat, Poppins, sans-serif',
      fontWeight: 800,
    },
    h3: {
      fontFamily: 'Montserrat, Poppins, sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: 'Montserrat, Poppins, sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: 'Montserrat, Poppins, sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Montserrat, Poppins, sans-serif',
      fontWeight: 600,
    },

    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingTop: 12,
          paddingBottom: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
