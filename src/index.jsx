import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import reportWebVitals from './reportWebVitals';
import createCustomTheme from './functions/createCustomTheme';
import { ThemeColorProvider } from './contexts/ThemeColorContext';

/**
 * Renders the root of the application, providing theme and color context.
 *
 * @component
 * @returns {JSX.Element} Root component of the application.
 */
function Root() {
  const [theme, setTheme] = useState(createCustomTheme());

  /**
   * Updates the current theme used in the application.
   *
   * @param {object} newTheme - The new theme object to apply.
   */
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <ThemeColorProvider>
          <App updateTheme={updateTheme} currentTheme={theme} />
        </ThemeColorProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

reportWebVitals();
