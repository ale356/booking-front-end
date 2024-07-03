/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography, Button, Box, TextField,
} from '@mui/material';
import customTheme from '../functions/customTheme';
import LoginReminder from '../components/LoginReminder';
import validateJwt from '../functions/validateJwt';

/**
 * EditEmailPage component allows administrators to update an email address.
 *
 * @component
 * @returns {JSX.Element} The JSX markup for the component.
 */
function EditEmailPage() {
  const { id } = useParams();
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  /**
   * Fetches the current email address associated with the given ID.
   */
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`https://onedv613-restful-api.onrender.com/api/v1/emails/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEmail(data.email);
      } catch (fetchError) {
        console.error('Error fetching email:', fetchError);
      }
    };

    const isLoggedIn = validateJwt();
    setLoggedIn(isLoggedIn);

    if (isLoggedIn) {
      fetchEmail();
    }
  }, [id]);

  /**
   * Validates the format of an email address.
   *
   * @param {string} emailString - The email address to validate.
   * @returns {boolean} True if the email format is valid, otherwise false.
   */
  const validateEmail = (emailString) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(emailString);
  };

  /**
   * Handles the update of the email address.
   */
  const handleUpdate = async () => {
    const token = localStorage.getItem('accessToken');
    if (!newEmail) {
      setError('Please enter a new email address.');
      return;
    }
    if (!validateEmail(newEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch(`https://onedv613-restful-api.onrender.com/api/v1/emails/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: newEmail }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (response.status === 204) {
        // No content, successful update
        navigate('/admin');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (updateError) {
      console.error('Error updating email:', updateError);
      setError('Failed to update email. Please check your input.');
    }
  };

  if (!loggedIn) {
    return (
      <LoginReminder />
    );
  }

  if (!email) {
    return (
      <Typography variant="h5" align="center" mt={5} gutterBottom>
        Loading...
      </Typography>
    );
  }

  return (
    <Box m={4}>
      <Typography
        variant="h4"
        sx={{
          ...customTheme.typography.h4, textAlign: 'center', paddingTop: customTheme.spacing(3), paddingBottom: customTheme.spacing(3),
        }}
      >
        Edit Email
      </Typography>
      <TextField
        fullWidth
        label="Current Email"
        value={email}
        disabled
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="New Email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        sx={{ mt: 2 }}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Box display="flex" justifyContent="flex-start" mt={2}>
        <Button
          variant="contained"
          onClick={() => navigate('/admin')}
        >
          Go Back
        </Button>
        <Box sx={{ marginLeft: 'auto' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            sx={{ marginLeft: '16px' }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default EditEmailPage;
