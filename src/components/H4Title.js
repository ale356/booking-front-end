import Typography from '@mui/material/Typography';
import customTheme from '../customTheme'

/**
 * A H4 title React component.
 *
 * @param {string} text - The text content to be displayed.
 * @returns {Component} a component.
 */
const H4Title = ({ text }) => {
  return (
    <Typography variant="h4" sx={{
      fontWeight: 800,
      paddingTop: customTheme.spacing(3),
      paddingBottom: customTheme.spacing(3),
      display: "flex",
      justifyContent: "center"
    }}>
      {text}
      </Typography>
  );
};

export default H4Title;
