import { createTheme } from '@mui/material/styles';
import { blue, green, red } from '@mui/material/colors';

/**
 * Creates a custom Material-UI theme with specified primary, secondary, and error colors.
 *
 * @returns {Theme} A Material-UI theme object.
 */
const customTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: green[500],
    },
    error: {
      main: red[500],
    },
  },
});

export default customTheme;
