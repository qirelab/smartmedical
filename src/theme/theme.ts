import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#18A36C',
      },
      secondary: {
        main: '#E8E6E3',
      },
      background: {
        default: '#FFFFFF',
        paper: '#F9FAFB',
      },
      text: {
        primary: '#2E2E2E',
        secondary: '#4A5565',
      },
    },
    typography: {
        h1: {
            fontSize: '72px',
        },
        h2: {
            fontSize: '48px',
        },
        h3: {
            fontSize: '20px',
        },
        body1: {
            fontSize: '16px',
        },
        
    }

});