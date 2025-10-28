'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#18A36C',
      light: '#4CAF50',
      dark: '#2E7D32',
    },
    secondary: {
      main: '#2E2E2E',
      light: '#424242',
      dark: '#1C1C1C',
    },
    background: {
      default: '#F8F8F8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2E2E2E',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#2E2E2E',
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
  },
});
