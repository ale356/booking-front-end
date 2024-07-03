/* eslint-disable no-console */
import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import customTheme from '../functions/customTheme';

/**
 * Represents the SignIn component for user authentication.
 *
 * @component
 * @returns {JSX.Element} The JSX element representing the Sign In form.
 */
export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  /**
 * Sends a POST request to submit user login data.
 *
 * @param {string} url - The URL to send the POST request to.
 * @param {object} data - The data to include in the POST request body.
 */
  const postData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();

      // Save the access token in local storage.
      localStorage.setItem('accessToken', responseData.access_token);

      navigate('/admin');
    } catch (error) {
      console.error('There was a problem with the login request:', error);
      setErrorMessage('Wrong credentials. Please try again.');
    }
  };

  /**
   * Handles form submission for user login.
   *
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    // Post the data to the server.
    postData('https://onedv613-restful-api.onrender.com/api/v1/login', data);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              inputProps={{ 'data-testid': 'username' }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputProps={{ 'data-testid': 'password' }}
            />
            {errorMessage && (
              <Typography color="error" variant="body2" align="center">
                {errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
