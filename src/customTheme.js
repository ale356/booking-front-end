import { createTheme } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';

const customTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

export default customTheme