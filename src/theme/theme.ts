// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1E3A8A' }, // Blue
    secondary: { main: '#000000' }, // Black
    background: { default: '#ffffff' }, // White
    text: { primary: '#000000', secondary: '#1E3A8A' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
