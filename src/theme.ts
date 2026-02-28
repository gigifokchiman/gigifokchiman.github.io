import { createTheme } from '@mui/material/styles';
import palette from './palette';

const theme = createTheme({
  palette: {
    primary: {
      main: palette.matcha,
    },
    secondary: {
      main: palette.sumi,
    },
    background: {
      default: palette.washi,
      paper: palette.shikkui,
    },
    text: {
      primary: palette.bokuju,
      secondary: palette.usuzumi,
    },
    divider: palette.suna,
  },
  typography: {
    fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: `0 4px 20px rgba(44, 44, 44, 0.08)`,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: palette.bengara,
          '&:hover': {
            color: palette.bengaraDark,
          },
        },
      },
    },
  },
});

export default theme;
