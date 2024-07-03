/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  TextField, Grid, Typography, Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import createCustomTheme from '../functions/createCustomTheme';
import LoginReminder from '../components/LoginReminder';
import validateJwt from '../functions/validateJwt';

/**
 * ChangeThemeColorPage component allows administrators to update the application's theme colors.
 *
 * @param {function} updateTheme - Function to update the theme in the application.
 * @param {object} currentTheme - The current theme object.
 * @returns {JSX.Element} The rendered ChangeThemeColorPage component.
 */
function ChangeThemeColorPage({ updateTheme, currentTheme }) {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedColors, setSelectedColors] = useState({
    primary: currentTheme.palette.primary.main,
    secondary: currentTheme.palette.secondary.main,
    error: currentTheme.palette.error.main,
  });

  useEffect(() => {
    const isLoggedIn = validateJwt();
    setLoggedIn(isLoggedIn);
  }, []);

  /**
   * Handles the change of the primary color.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the color input.
   */
  const handlePrimaryColorChange = (e) => {
    setSelectedColors({ ...selectedColors, primary: e.target.value });
  };

  /**
   * Handles the change of the secondary color.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the color input.
   */
  const handleSecondaryColorChange = (e) => {
    setSelectedColors({ ...selectedColors, secondary: e.target.value });
  };

  /**
   * Handles the change of the error color.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the color input.
   */
  const handleErrorColorChange = (e) => {
    setSelectedColors({ ...selectedColors, error: e.target.value });
  };

  /**
   * Navigates back to the admin page.
   */
  const handleNavigation = () => {
    navigate('/admin');
  };

  /**
   * Sends the updated theme colors to the server and updates the theme.
   */
  const handleConfirm = async () => {
    const newTheme = createCustomTheme('primary', selectedColors.primary);
    const themeData = {
      palette: {
        primary: { main: selectedColors.primary },
        secondary: { main: selectedColors.secondary },
        error: { main: selectedColors.error },
      },
    };

    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch('https://onedv613-restful-api.onrender.com/api/v1/theme', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(themeData),
      });

      if (response.status !== 204) {
        throw new Error('Failed to update theme');
      }

      console.log('Theme updated successfully');
      updateTheme(newTheme);
      handleNavigation();
    } catch (error) {
      console.error('Failed to update theme:', error);
    }
  };

  /**
   * Resets the theme colors to the default values.
   */
  const handleReset = () => {
    const defaultTheme = createCustomTheme();
    setSelectedColors({
      primary: defaultTheme.palette.primary.main,
      secondary: defaultTheme.palette.secondary.main,
      error: defaultTheme.palette.error.main,
    });
  };

  if (!loggedIn) {
    return (
      <LoginReminder />
    );
  }

  return (
    <Grid container my={3} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Change Color
        </Typography>
      </Grid>
      <Grid mr={2} ml={2} item xs={12}>
        <TextField
          label="Primary Color"
          type="color"
          value={selectedColors.primary}
          onChange={handlePrimaryColorChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
      </Grid>
      <Grid item mr={2} ml={2} xs={12}>
        <TextField
          label="Secondary Color"
          type="color"
          value={selectedColors.secondary}
          onChange={handleSecondaryColorChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
      </Grid>
      <Grid item mr={2} ml={2} xs={12}>
        <TextField
          label="Error Color"
          type="color"
          value={selectedColors.error}
          onChange={handleErrorColorChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" onClick={handleNavigation} sx={{ margin: 2 }}>
          Go Back
        </Button>
      </Grid>
      <Grid item xs={4} sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleReset}
          sx={{ margin: 2 }}
        >
          Reset
        </Button>
      </Grid>
      <Grid item xs={4} sx={{ textAlign: 'right' }}>
        <Button variant="contained" color="primary" onClick={handleConfirm} sx={{ margin: 2 }}>
          Confirm
        </Button>
      </Grid>
    </Grid>
  );
}

ChangeThemeColorPage.propTypes = {
  updateTheme: PropTypes.func.isRequired,
  currentTheme: PropTypes.shape({
    palette: PropTypes.shape({
      primary: PropTypes.shape({
        main: PropTypes.string.isRequired,
      }).isRequired,
      secondary: PropTypes.shape({
        main: PropTypes.string.isRequired,
      }).isRequired,
      error: PropTypes.shape({
        main: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ChangeThemeColorPage;
