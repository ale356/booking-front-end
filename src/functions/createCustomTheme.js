/**
 * Creates a custom MUI theme based on severity and color.
 *
 * @param {string} severity - The severity level ('primary', 'secondary', 'error').
 * @param {string} color - The color value in hex, RGB, RGBA, HSL, HSLA or a valid CSS color name.
 * @returns {import('@mui/material/styles').Theme} The customized MUI theme.
 */
import { createTheme } from '@mui/material/styles';
import { blue, green, red } from '@mui/material/colors';

const createCustomTheme = (severity, color) => createTheme({
  palette: {
    primary: {
      main: severity === 'primary' ? color : blue[500],
      contrastText: '#ffffff',
    },
    secondary: {
      main: severity === 'secondary' ? color : green[500],
      contrastText: '#ffffff',
    },
    error: {
      main: severity === 'error' ? color : red[500],
      contrastText: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff', // Ensure the text color is always white
        },
      },
    },
  },
});

export default createCustomTheme;
