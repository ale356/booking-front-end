import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

/**
 * Handles email sign-up functionality.
 *
 * @returns {JSX.Element} EmailBlock component.
 */
export default function EmailBlock() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  /**
   * Handles changes in the email input field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object.
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  /**
 * Validates the format of the email address.
 * @param {string} emailString - The email address to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
  const validateEmail = (emailString) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(emailString);
  };

  /**
   * Sends a POST request to submit the entered email for sign-up.
   */
  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('https://onedv613-restful-api.onrender.com/api/v1/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('Email submitted successfully');
        setError('');
        setEmail('');
      } else {
        console.error('Failed to submit email');
        setError('Failed to submit email. Please try again.');
      }
    } catch (submitError) {
      console.error('Error submitting email:', submitError);
      setError('Error submitting email. Please try again.');
    }
  };

  return (
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 3,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Get Email Updates & Offers.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <TextField
              fullWidth
              id="fullWidth"
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              error={!!error}
              helperText={error}
            />
          </Box>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button fullWidth id="fullWidth" variant="contained" onClick={handleSignUp}>
              Sign Me Up!
            </Button>
          </Stack>
        </Container>
      </Box>
    </main>
  );
}
